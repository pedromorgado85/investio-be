const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const InvestorProfile = require('../models/investorProfile');
const User = require('../models/user');
const investorProfileCalculator = require('../utils/investorProfileCalc');

router.get('/users/:userId/investorProfile/:investorProfileID', (req, res) => {
  InvestorProfile.findById(req.params.investorProfileID)
    .then((investorProfile) => {
      res.json(investorProfile);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post('/investorProfile', (req, res) => {
  const ipCalcul = investorProfileCalculator(
    req.body.ageGroup,
    req.body.education,
    req.body.profession,
    req.body.experience,
    req.body.risk,
    req.body.investment
  );
  console.log(ipCalcul);
  const profile = new InvestorProfile({
    ageGroup: parseInt(req.body.ageGroup),
    education: parseInt(req.body.education),
    profession: parseInt(req.body.profession),
    experience: parseInt(req.body.experience),
    risk: parseInt(req.body.risk),
    investment: parseInt(req.body.investment),
    user: req.session.passport.user,
    result: ipCalcul
  });
  console.log(profile);
  profile.save().then((investorProfile) => {
    User.findByIdAndUpdate(
      req.session.passport.user,
      { $push: { investorProfiles: investorProfile._id } },
      { new: true }
    )
      .populate('investorProfiles portefolio')
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((error) => {
        res.json(error);
      });
  });
});

router.put('/investorProfile/:id', (req, res) => {
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
router.delete('/investorProfile/:id', (req, res) => {
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
