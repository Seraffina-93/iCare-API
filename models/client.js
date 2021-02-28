const Joi = require('joi');
const mongoose = require('mongoose');

const Client = mongoose.model('Client', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    },
    email: {
        type: String
    },
    instagram: {
        type: String,
        minlength: 4,
        maxlength: 25
    },
    address: {
        type: String,
        minlength: 8,
        maxlength: 50
    }
}));

function validateClient(client) {
    const schema = Joi.object({
        name: Joi.string().min(8).max(50).required(),
        phone: Joi.string().min(8).max(15).required(),
        email: Joi.string().min(5).max(50),
        instagram: Joi.string().min(4).max(25),
        address: Joi.string().min(8).max(50)
    });
    return schema.validate(client);
}

exports.Client = Client;
exports.validate = validateClient;