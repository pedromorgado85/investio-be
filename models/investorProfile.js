const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investorProfile = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ageGroup: {
    type: Number,
    trim: true,
    required: true
  },
  education: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    required: true,
  },
  profession: {
    type: Number,
    required: true,
  },
  risk: {
    type: Number,
    required: true
  },
  investment: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('InvestorProfile', investorProfile);
