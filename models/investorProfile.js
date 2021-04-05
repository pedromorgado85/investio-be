const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investorProfile = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  age: {
    type: Number,
    trim: true,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  riskAppetite: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('InvestorProfile', investorProfile);
