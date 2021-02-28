const {Transaction, validate} = require('../models/transaction');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const transactions = await Transaction.find().sort('name');
    res.send(transactions);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let transaction = new Transaction({
      clientID:req.body.client,
      ticketID: req.body.ticked,
      date: req.body.date,
      productList: req.body.productList,
      total: req.body.total,
      notes: req.body.notes
    });
    transaction = await transaction.save();

    res.send(transaction);
  });

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const transaction = await Transaction.findByIdAndUpdate(req.params.id, {
      clientID:req.body.client,
      ticketID: req.body.ticked,
      date: req.body.date,
      productList: req.body.productList,
      total: req.body.total,
      notes: req.body.notes
    }, { new: true });

    if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');

    res.send(transaction);
});

router.delete('/:id', async (req,res) => {
    const transaction = await Transaction.findByIdAndRemove(req.params.id);

    if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');

    res.send(transaction);
});

router.get('/:id', async (req, res) => {
    const transaction = await Part.findById(req.params.id);

    if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');

    res.send(transaction);
});

module.exports = router;
