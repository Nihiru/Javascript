const router = require('express').Router()
const verify = require('./verifyToken')


router.get('/', verify, (req, res)=> {
    // res.json({
    //     posts :{
    //         title:'my first post',
    //         description: 'random data without login'
    //     }
    // })
    res.send(req.user)
    User.findByOne({_id : req.user})
})

module.exports = router