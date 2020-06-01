const express = require('express');
const clients = require('../routes/clients');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/clients', clients);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}