const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asset = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Asset', asset);
