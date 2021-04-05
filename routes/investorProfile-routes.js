const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const InvestorProfile = require('../models/investorProfile');

router.get(
  '/users/:userId/investorProfile/:investorProfileID',
  (req, res, next) => {
    InvestorProfile.findById(req.params.investorProfileID)
      .then((investorProfile) => {
        res.json(investorProfile);
      })
      .catch((error) => {
        res.json(error);
      });
  }
);

router.post('/investorProfile', (req, res, next) => {
  InvestorProfile.create({
    age: req.body.age,
    education: req.body.education,
    experience: req.body.experience,
    riskAppetite: req.body.riskAppetite,
    user: req.body.userID
  })
    .then((response) => {
      return InvestorProfile.findByIdAndUpdate(req.body.investorProfileID, {
        $push: { investorProfile: response._id }
      });
    })
    .then((theResponse) => {
      res.json(theResponse);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.put('/investorProfile/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  InvestorProfile.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `InvestorProfile with ${req.params.id} is updated successfully.`
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
router.delete('/investorProfile/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  InvestorProfile.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `InvestorProfile with ${req.params.id} is removed successfully.`
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
