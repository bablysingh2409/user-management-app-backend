const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('../middlewares/error');
require('dotenv').config();

const authentication = {
    signup: async (req, res, next) => {
        try {
            const { name, email, password,phone,gender,source,city,state } = req.body;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({
                email,
                name,
                password: hash,
                phone,gender,source,city,state
            });
            await newUser.save();
            
            res.status(200).send(newUser);

        }
        catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email} = req.body;

            const user = await User.findOne({email});
            if (!user) {
                return next(createError(404, 'user not found'));
            }
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) return next(createError(400, 'wrong password and email'));
            const token= jwt.sign(
                {
                    id:user._id,
                },
                process.env.JWT_SECRET
            );
            const {password,...otherDetails}=user._doc;

            // res.cookie("access_token",token,{
            //     httpOnly:true,
            //     maxAge: 3600000
            // }).status(200).json({...otherDetails});
            res.status(200).json({...otherDetails});
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = authentication;