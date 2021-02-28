const {Part, validate} = require('../models/part');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const parts = await Part.find().sort('name');
    res.send(parts);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let part = new Part({
      sku: req.body.sku,
      name: req.body.name,
      cost: req.body.cost,
      price: req.body.price,
      quantity: req.body.quantity,
      targetQuantity: req.body.targetQuantity,
      compatible: req.body.compatible
    });
    part = await part.save();

    res.send(part);
  });

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const part = await Part.findByIdAndUpdate(req.params.id, {
        sku:req.body.sku,
        name: req.body.name,
        cost: req.body.cost,
        price: req.body.price,
        quantity: req.body.quantity,
        targetQuantity: req.body.targetQuantity,
        compatible: req.body.compatible
    }, { new: true });

    if (!part) return res.status(404).send('The part with the given ID was not found.');

    res.send(part);
});

router.delete('/:id', async (req,res) => {
    const part = await Part.findByIdAndRemove(req.params.id);

    if (!part) return res.status(404).send('The part with the given ID was not found.');

    res.send(part);
});

router.get('/:id', async (req, res) => {
    const part = await Part.findById(req.params.id);

    if (!part) return res.status(404).send('The part with the given ID was not found.');

    res.send(part);
});

module.exports = router;
