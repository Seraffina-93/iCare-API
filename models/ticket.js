const Joi = require('joi');
const mongoose = require('mongoose');

const ticket = mongoose.model('Ticket', new mongoose.Schema({
  client:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
  },
  parts: [
    type: mongoose.Schema.Types.ObjectId,
    ref: 'part',
  ],
  notes: {
    type: String,
    minlength: 0,
    maxlength: 1000
  },
  creationDate:{
    type:Date,
    required: True
  },
  appointmentDate:{
    type:Date,
    required:True
  },
  deviceModel:{
    type: String,
    required: True,
    maxlength: 50
  },
  deviceColor: {
    type: String,
    required: True,
    maxlength: 50
  },
  deviceIMEI:{
    type: String,
    required: True,
    maxlength: 14
  },
  description:{
    type: String,
    required: True,
    maxlength: 1000
  },
  deviceCode:{
    type: String,
    required: True,
    maxlength: 6
  },
  status:{
    type:String,
    maxlength: 20
  },
  protection:{
    type:String,
    maxlength: 20
  },
  issues:[
    type: String,
    maxlength: 20
  ],
  appleID:{
    type: String,
    maxlength: 50
  },
  appleIDPassword:{
    type: String,
    maxlength: 25
  }
}));

function validatePart(part) {
    const schema = {
        notes: Joi.string().min(0).max(1000).required(),
        creationDate: Joi.date().required(),
        appointmentDate: Joi.date().required(),
        deviceModel: Joi.string().max(50).required(),
        description: Joi.string().max(1000),
        deviceCode: Joi.string().max(6),
        protection: Joi.string().max(20),
        appleID: Joi.string().max(50),
        appleIDPassword:  Joi.string().max(25)
    };
    return Joi.validate(ticket, schema);
}

exports.Tickets = Ticket;
exports.validate = validateTicket;
