const express = require('express');
const clients = require('../routes/clients');
const parts = require('../routes/parts');
const transactions = require('../routes/transactions');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/clients', clients);
    app.use('/api/parts', parts);
    app.use('/api/transactions', transactions);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}