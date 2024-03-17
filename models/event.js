const mongoose =  require('mongoose');
const Joi = require('joi');
const userSchema = require('../models/user');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 100
    },
    date: {
        type: String,
        required: true
    },
    organizer: {
        type: userSchema,

    }
});

const Event = mongoose.model('Event', eventSchema);


function validateEvent(event){
    const schema = {
        name: Joi.string().required().min(5).max(100),
        date: Joi.string().required().min(5).max(100),
        organizerId: Joi

    }
    return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateEvent;