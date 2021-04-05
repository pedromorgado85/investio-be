const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  investorProfile: [{ type: Schema.Types.ObjectId, ref: 'InvestorProfile' }],
  portefolio: [{ type: Schema.Types.ObjectId, ref: 'Asset' }]
});

module.exports = mongoose.model('User', user);
