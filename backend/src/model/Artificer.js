const mongoose = require('mongoose');

const Artificer = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expertise: {
    type: String,
    enum: ['handle', 'case', 'dial', 'crystal', 'crown'],
    required: true
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Order'
  }]
});

Artificer.pre('findOneAndUpdate', next => {
  console.log('pre update hook');
  next();
});

module.exports = mongoose.model('Artificer', Artificer);
