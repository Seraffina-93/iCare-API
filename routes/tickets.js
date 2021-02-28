const {Ticket, validate} = require('../models/ticket');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const tickets = await Ticket.find().sort('name');
    res.send(tickets);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let ticket = new Ticket({
      client:req.body.client,
      parts: req.body.parts,
      notes: req.body.notes,
      creationDate: req.body.creationDate,
      appointmentDate: req.body.appointmentDate,
      deviceModel: req.body.deviceModel,
      deviceColor: req.body.deviceColor,
      deviceIMEI: req.body.deviceIMEI,
      deviceCode: req.body.deviceCode,
      description: req.body.description,
      status: req.body.status,
      protection: req.body.protection,
      issues: req.body.issues,
      appleID: req.body.appleID,
      appleIDPassword: req.body.appleIDPassword
    });
    ticket = await ticket.save();

    res.send(ticket);
  });

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, {
      client:req.body.client,
      parts: req.body.parts,
      notes: req.body.notes,
      creationDate: req.body.creationDate,
      appointmentDate: req.body.appointmentDate,
      deviceModel: req.body.deviceModel,
      deviceColor: req.body.deviceColor,
      deviceIMEI: req.body.deviceIMEI,
      deviceCode: req.body.deviceCode,
      description: req.body.description,
      status: req.body.status,
      protection: req.body.protection,
      issues: req.body.issues,
      appleID: req.body.appleID,
      appleIDPassword: req.body.appleIDPassword
    }, { new: true });

    if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

    res.send(ticket);
});

router.delete('/:id', async (req,res) => {
    const transaction = await Transaction.findByIdAndRemove(req.params.id);

    if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

    res.send(ticket);
});

router.get('/:id', async (req, res) => {
    const ticket = await Part.findById(req.params.id);

    if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

    res.send(ticket);
});

module.exports = router;
