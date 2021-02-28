const Joi = require('joi');
const mongoose = require('mongoose');

const part = mongoose.model('Part', new mongoose.Schema({
    sku:{
        type: String,
        minlength: 1,
        maxlength: 30
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    cost: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    price: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    quantity: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    targetQuantity: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 3
    },
    compatible: {
        type: String
    }
}));

function validatePart(part) {
    const schema = Joi.object({
        sku: Joi.string().min(1).max(30),
        name: Joi.string().min(5).max(50).required(),
        cost: Joi.number().min(1).max(3).required(),
        price: Joi.number().min(1).max(3).required(),
        quantity: Joi.number().min(1).max(3).required(),
        targetQuantity: Joi.number().min(1).max(3).required(),
        compatible: Joi.string()
    });
    return schema.validate(part);
}

exports.Parts = Part;
exports.validate = validatePart;
