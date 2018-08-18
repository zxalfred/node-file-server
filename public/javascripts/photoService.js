const path = require('path');
const fs = require('fs');
const Photo = require('../../models/Photo');

exports.form = function (req, res) {
  res.render('photos/upload', {
    title: 'Photo upload',
  });
};

exports.submit = function (dir) {
  return function (req, res, next) {
    const originalName = req.file.originalname;
    const suffix = originalName.split('.').pop();
    const name = req.body.photoName ? `${req.body.photoName}.${suffix}` : originalName;
    const toPath = path.join(dir, name);
    fs.rename(req.file.path, toPath, (err) => {
      if (err) return next(err);

      Photo.create({
        name,
        path: name,
      }, (err) => {
        if (err) return next(err);
        res.redirect('/photos');
      });
    });
  };
};

exports.download = function (dir) {
  return function (req, res, next) {
    const { id } = req.params;
    Photo.findById(id, (err, photo) => {
      if (err) return next(err);
      const imgPath = path.join(dir, photo.path);
      res.download(imgPath);
    });
  };
};
