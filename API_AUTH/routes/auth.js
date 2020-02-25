const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const User = require('../model/user')
const {registerValidation, loginValidation} = require('../validation')

router.post('/register', async (req, res)=>{
    // validation while registering user
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    // check if the user already exists
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists')

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    // creating a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    // saving the user to the Mongodb Atlas
    try{
        const savedUser = await user.save();
        // res.send(savedUser)
        res.send({user: user._id})
    }catch(err){
        res.status(400).send(err)
    }
})

// Login validation
router.post('/login', async (req, res) => {
    // login validation
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    // check if it already exists
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email not registered')

    // password is correct
    const validPass  = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid Password')
    
    // create and assign a token when user logs in
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

module.exports = router