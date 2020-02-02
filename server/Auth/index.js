const express = require('express')
const router = express.Router();
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const db = require('../DB/connection.js')
const users = db.get('users')
users.createIndex('username', {unique: true})

const schema = Joi.object().keys({
    username: Joi.string().regex(/([a-zA-Z0-9]*$)/).alphanum().min(2).max(30).required(),
    password: Joi.string().trim().min(6).required()
})

// any route is pre-pended with /auth/
router.get('/',(req, res)=>{
    res.json({
        message: "locked"
    })
})


//POST /auth/signup

router.post('/signup', (req, res, next)=>{
    const result = Joi.validate(req.body, schema)
    if(result.error === null){
        // make sure username is unique
        users.findOne({
            username: req.body.username
        }).then(user => {
            // if the user is undefined, user is not in the db
            if(user){
                // there is already user exists
                const err = new Error('User already exists. Please choose another one')
                next(err)
            } else {
                bcrypt.hash(req.body.password, 10)
                .then(hashedPassword => {
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword
                    }
                    users.insert(newUser).then(insertedUser=>{
                        delete insertedUser.password
                        res.json(insertedUser)
                    })
                })
            }
        })
    } else {
        next(result.error)
    }
    
})


module.exports = router