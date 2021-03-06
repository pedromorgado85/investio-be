const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: true,
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
  // image: {
  //   type: Image,
  //   required: false,
  // },
  investorProfiles: [{ type: Schema.Types.ObjectId, ref: 'InvestorProfile' }],
  portefolio: [{ type: Schema.Types.ObjectId, ref: 'Asset' }]
});

module.exports = mongoose.model('User', user);
