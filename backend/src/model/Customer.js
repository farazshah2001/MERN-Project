const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Order'
  }]
});

CustomerSchema.pre('findOneAndUpdate', next => {
  console.log('pre update hook');
  next();
});

module.exports = mongoose.model('Customer', CustomerSchema);
