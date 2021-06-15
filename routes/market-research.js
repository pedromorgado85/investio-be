const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const MarketResearch = require('..models/market');

router.get('/market-research', (req, res, next) => {
  MarketResearch.findById(req.params.marketResearch)
    .then((marketResearch) => {
      res.json(marketResearch);
    })
    .catch((error) => {
      res.json(error);
    });
});
