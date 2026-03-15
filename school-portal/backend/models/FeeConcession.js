const mongoose = require('mongoose');

const feeConcessionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  concessionType: {
    type: String,
    enum: ['scholarship', 'staff', 'sibling', 'merit', 'financial', 'other'],
    required: true
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  applicableFees: [{
    type: String,
    enum: ['tuition', 'transport', 'hostel', 'library', 'sports', 'exam', 'all']
  }],
  reason: String,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  validUntil: Date,
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FeeConcession', feeConcessionSchema);