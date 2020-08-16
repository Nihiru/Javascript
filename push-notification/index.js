const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// set static path

app.use(express.static(path.join(__dirname, 'client')))


app.use(bodyParser.json());

const publicVapidKey = 'BJ4iys8KcwDINTi0HjDiESXutJzmBj-_2m_pXsl6bfGQgg7mlDIi3Dwo-TIJrLGlywgj9R9ADfU1ch0A9PczdFo';
const privateVapidKey = 'OuDtoTF3whGdR2yPEdkyTz-GhYsNDGAxcFRKDlPXeYM';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req, res) => {
   // pushSubscription Object
   const subscription =  req.body

   //send 201 - resource created successfully
   res.status(201).json({})

   //create payload 
   const payload = JSON.stringify({
       title: 'push test'
   })

   //pass object into sendNotification
   webPush.sendNotification(subscription, payload).catch(err => console.error(err))

})

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`))