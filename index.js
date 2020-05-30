const mongoose = require('mongoose');
const clients = require('./routes/clients');

const express = require('express');
const app = express();

//Connecting to the database
mongoose.connect('mongodb://localhost/icare')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB'));


//Routes
app.use(express.json());
app.use('/api/clients', clients);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}... `));' ;'

