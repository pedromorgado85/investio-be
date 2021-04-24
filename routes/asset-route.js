const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Asset = require('../models/asset');
const User = require('../models/user');

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
  const asset = new Asset({
    name: req.body.name,
    type: req.body.type,
    amount: req.body.amount,
    unit: req.body.unit,
    user: req.body.userID,
  })
  asset.save().then((asset) => {
    User.findByIdAndUpdate(req.session.passport.user, { $push: { portefolio: asset._id } }, { new: true })
      .populate('investorProfiles portefolio')
      .then((updatedUser) => {
        res.json(updatedUser);
      }).catch((error) => {
        res.json(error);
      });
  }
  )
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
