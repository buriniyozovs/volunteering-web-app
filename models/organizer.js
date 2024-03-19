const mongoose = require('mongoose');
const Joi = require('joi');

const organizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const Organizer = mongoose.model('Orginizer', organizerSchema);

function validateOrganizer(organizer){
    const schema = {
        name: Joi.string().required().min(3).max(100),
        email: Joi.string().required().min(9).max(100),
        phoneNumber: Joi.string().required().min(9).max(100),
    }
    return Joi.validate(organizer, schema);
}

exports.organizerSchema = organizerSchema;
exports.Organizer = Organizer;
exports.validate = validateOrganizer;
