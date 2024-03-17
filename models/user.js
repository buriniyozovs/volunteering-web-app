const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 25
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().required().min(3).max(25),
        email: Joi.string().required().min(5).max(25),
        phoneNumber: Joi.string().required().min(3).max(25),
        password: Joi.string().required().min(5).max(1024)
    }    

    return Joi.validate(user, schema);
};
exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
