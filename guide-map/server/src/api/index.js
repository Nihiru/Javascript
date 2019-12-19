console.log("inside /src/api/index.js")
const express = require('express');

const messages = require('./messages');

// const emojis = require('./emojis');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/messages', messages);

module.exports = router;
