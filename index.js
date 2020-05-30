const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');

const clients = require('./routes/clients');
const users = require('./routes/users');
const auth = require('./routes/auth');


const app = express();


if(!config.get('jwtPrivateKey')) {
    console.error('FATAR ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


//Connecting to the database
mongoose.connect('mongodb://localhost/icare')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB'));


//Routes
app.use(express.json());
app.use('/api/clients', clients);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}... `));' ;'

