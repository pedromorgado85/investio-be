const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user');


// POST route => to create a new user
router.post('/users', (req, res, next) => {
  const { name, email, password } = req.body;
  User.create({
    name,
    email,
    password,
  })
    .populate('investorProfiles assets')
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/users', (req, res, next) => {
  User.find()
    .populate('investorProfiles assets')
    .then((allTheUsers) => {
      res.json(allTheUsers);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/users/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  User.findById(req.params.id)
    .populate('investorProfiles assets')
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.put('/users/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      res.json({
        message: `User with ${req.params.id} is updated successfully.`
      });
    })
    .populate('investorProfiles assets')
    .catch((error) => {
      res.json(error);
    });
});

router.delete('/users/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `User with ${req.params.id} is removed successfully.`
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
