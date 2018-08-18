const express = require('express');

const router = express.Router();
const photos = [];
photos.push({
  name: 'Node.js Logo',
  path: 'http://nodejs.org/images/logos/nodejs-green.png',
});

photos.push({
  name: 'Ryan Speaking',
  path: 'http://nodejs.org/images/ryan-speaker.jpg',
});

router.get('/intro', (req, res, next) => {
  res.render('photos', {
    title: 'Photos',
    photos,
  });
});

module.exports = router;
