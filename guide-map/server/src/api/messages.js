console.log("Inside /src/api/messages.js")
const express = require('express');

const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().regex(/^[a-zA-Z0-9 _-]{1,100}$/).min(1).max(100)
    .required(),
  message: Joi.string().min(1).max(500)
    .required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

const db = require('../db');

const messages = db.get('messages');

const router = express.Router();

router.get('/', (req, res) => {
  messages
  .find()
  .then(allMessages => {
  res.json(allMessages);
  })
});

router.post('/', (req, res, next) => {
 
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // eslint-disable-next-line object-curly-newline
    const { name, message, latitude, longitude } = req.body;
    const userMessage = {
      name,
      message,
      latitude,
      longitude,
      date: new Date()
    };
    messages
      .insert(userMessage)
      .then((insertedMessage) => {
        res.json(insertedMessage);
      });
      
  } else {
    next(result.error);
  }
});


module.exports = router;
