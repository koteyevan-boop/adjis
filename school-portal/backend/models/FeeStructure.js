const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['tuition', 'transport', 'hostel', 'library', 'sports', 'exam', 'miscellaneous'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  frequency: {
    type: String,
    enum: ['one-time', 'monthly', 'quarterly', 'half-yearly', 'annual'],
    required: true
  },
  dueDate: Date,
  description: String,
  isOptional: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

feeStructureSchema.index({ academicYear: 1, grade: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('FeeStructure', feeStructureSchema);