const {Client, validate} = require('../models/client');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const clients = await Client.find().sort('name');
    res.send(clients);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    
    if (error) return res.status(400).send(error.details[0].message);
  
    let client = new Client({ 
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      instragram: req.body.instagram,
      address: req.body.address
    });

    client = await client.save();
    
    res.send(client);
  });

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    const client = await Client.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        instragram: req.body.instagram,
        address: req.body.address
    }, { new: true });

    if (!client) return res.status(404).send('The client with the given ID was not found.');

    res.send(client);
});

router.delete('/:id', async (req,res) => {
    const client = await Client.findByIdAndRemove(req.params.id);
    
    if (!client) return res.status(404).send('The client with the given ID was not found.');

    res.send(client);
});

router.get('/:id', async (req, res) => {
    const client = await Client.findById(req.params.id);
    
    if (!client) return res.status(404).send('The client with the given ID was not found.');

    res.send(client);
});

module.exports = router;