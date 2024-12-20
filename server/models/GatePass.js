const mongoose = require('mongoose');

const GatePassSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  vehicle: { type: String, required: false },
  securityVerifiedBy: { type: String},
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GatePass', GatePassSchema);
