const mongoose = require('mongoose');
const Joi = require('joi');

const organizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contacts: {
        type: String,
        required: true
    },

});

const Organizer = mongoose.model('Orginizer', organizerSchema);

function validateOrganizer(organizer){
    const schema = {
        name: Joi.string().required().min(3).max(100),
        contacts: Joi.string().required().min(9).max(100)
    }
    return Joi.validate(organizer, schema);
}

exports.organizerSchema = organizerSchema;
exports.Organizer = Organizer;
exports.validate = validateOrganizer;
