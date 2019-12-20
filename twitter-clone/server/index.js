const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const RateLimit = require('express-rate-limit');


const db = monk('localhost/tweets');
const tweets = db.get('tweets');
const filter = new Filter();


const app = express();

app.use(cors());
app.use(express.json());



app.get('/', (req, res)=>{
    res.json({
        message:'Results retrieved sccessfully'
    })
});

app.get('/tweets',(req, res) => {
    tweets
    .find()
    .then(tweets_var =>{
        res.json(tweets_var);
    })
})
// ordering is vital for having a seamless interaction between server and client
app.use(RateLimit({
    windowMs: 30 *100 , //30 seconds you're allowed to submit 1 tweet
    max:1
}))

function isValidTweet(tweet){
    // console.log('Check');
    return tweet.name && tweet.name.toString().trim() !== '' &&
    tweet.content && tweet.content.toString().trim() !== ''
}

app.post('/tweets',(req, res)=> {
    console.log(req.body);
    if(isValidTweet(req.body)){
        console.log('Not empty');
        const tweet_Object = {
            name : filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };
        tweets
        .insert(tweet_Object)
        .then(createdTweet=>{
            res.json(createdTweet);
        });

     } else{
        console.log('empty data');
        res.status(422);
        // res.json({
        //     message : 'Name and content cannot be empty'
        // });
    }
})


app.listen(5000, ()=>{
    console.log("listening to port http://localhost:5000");
})