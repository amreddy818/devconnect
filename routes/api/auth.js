const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User');
const {check,validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/', auth , async function (req, res){
    try {
        console.log(req.user);
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
})

router.post('/',[
    check('email','Email is not valid').isEmail(),
    check('password','Password is required').exists()
] , async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email: email});

        if(!user){
            return res.status(400).send({errors:[{"message": "Invalid Credentials"}]});
        }

        const isMatch =await bcrypt.compare(password,user.password);

        if(!isMatch) {
            return res.status(400).send({errors:[{"message": "Invalid Credentials"}]});
        }

        const payload = {
            user :{
                id : user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            (err,token) => {
                if(err) {
                    throw err;
                }
                return res.json({token});
            }
        )
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server error: ' + err.message);
    }
})


module.exports = router;