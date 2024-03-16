const mongoose =  require('mongoose');
const Joi = require('joi');

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
    contacts: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);


function validateEvent(event){
    const schema = {
        name: Joi.string().required().min(5).max(100),
        date: Joi.string().required().min(5).max(100),
        contacts: Joi.string().required().min(5).max(100)
    }
    return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateEvent;