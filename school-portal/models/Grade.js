const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    enum: ['quarterly', 'half-yearly', 'annual', 'unit-test'],
    required: true
  },
  marks: {
    obtained: Number,
    total: Number,
    percentage: Number
  },
  grade: String,
  remarks: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  examDate: Date,
  academicYear: String
});

module.exports = mongoose.model('Grade', gradeSchema);