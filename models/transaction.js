const Joi = require('joi');
const mongoose = require('mongoose');

const transaction = mongoose.model('Transaction', new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ticket',
    },
    date: {
      type: Date
    },
    productList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'part',
    }],
    total: {
      type: Number
    },
    notes: {
      type: String
    }
}));

function validateTransaction(transaction) {
    const schema = Joi.object({
        date: Joi.date(),
        total: Joi.number()
    });
    return schema.validate(transaction);
}

exports.Transactions = Transaction;
exports.validate = validateTransaction;
