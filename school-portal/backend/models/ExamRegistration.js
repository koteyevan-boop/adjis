const mongoose = require('mongoose');

const examRegistrationSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subjects: [{
    name: String,
    code: String,
    isEligible: {
      type: Boolean,
      default: true
    },
    reason: String
  }],
  rollNumber: String,
  room: String,
  status: {
    type: String,
    enum: ['registered', 'appeared', 'absent', 'withdrawn'],
    default: 'registered'
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

examRegistrationSchema.index({ exam: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('ExamRegistration', examRegistrationSchema);