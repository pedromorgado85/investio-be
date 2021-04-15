const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const InvestorProfile = require('../models/investorProfile');
const User = require('../models/user');

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
  console.log("BODY", req.body)
  console.log("SESSION", req.session)
  InvestorProfile.create({
    ageGroup: parseInt(req.body.ageGroup),
    education: parseInt(req.body.education),
    profession: parseInt(req.body.profession),
    experience: parseInt(req.body.experience),
    risk: parseInt(req.body.risk),
    investment: parseInt(req.body.investment),
    // user: req.session.passport.user,
  })
    .then((response) => {
      return User.findByIdAndUpdate(req.body.userID, {
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
