const express = require('express');
const Photo = require('../models/Photo');

const router = express.Router();

router.get('/', (req, res, next) => {
  Photo.find({}, (err, imgs) => {
    if (err) return next(err);
    res.render('photos', {
      title: 'Photos',
      photos: imgs,
    });
  });
});

module.exports = router;
