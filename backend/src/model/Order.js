const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  state: {
    type: String,
    enum: ['ready', 'under', 'finished'],
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  watch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Watch',
    required: true
  },
  artificers: [{
    part: { type: String, enum: ['handle', 'case', 'dial', 'crystal', 'crown'] },
    artificer: { type: mongoose.Schema.Types.ObjectId, ref: 'Artificer' },
    notes: [{
      message: String,
      description: String,
      image: String
    }]
  }],
  partsCompleted: [{ type: String, enum: ['handle', 'case', 'dial', 'crystal', 'crown'] }]
});

OrderSchema.pre('findOneAndUpdate', next => {
  console.log('pre update hook');
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
