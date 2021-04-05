const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Asset = require('../models/asset');
const User = require('../models/user');
const InvestorProfile = require('../models/investorProfile');

router.get('/users/:userId/assets/:assetId', (req, res, next) => {
  Asset.findById(req.params.assetId)
    .then((asset) => {
      res.json(asset);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post('/assets', (req, res, next) => {
  Asset.create({
    name: req.body.title,
    amount: req.body.amount,
    unit: req.body.unit,
    user: req.body.userID
  })
    .then((response) => {
      return Asset.findByIdAndUpdate(req.body.assetID, {
        $push: { asset: response._id }
      });
    })
    .then((theResponse) => {
      res.json(theResponse);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.put('/assets/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Asset.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Asset with ${req.params.id} is updated successfully.`
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
router.delete('/assets/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Asset.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Asset with ${req.params.id} is removed successfully.`
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
