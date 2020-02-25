const express  = require('express')
const app      = express()
const mongoose = require('mongoose')
const dotenv   = require('dotenv')

// Import Routes
const authRoute  = require('./routes/auth');
const postRoute = require('./routes/posts')
dotenv.config();


//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser :  true},
    () =>  console.log("Database connection established")
)

// Middleware
app.use(express.json())


// Route middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, ()=> {
    console.log(" Server up and running on PORT 3000")
})