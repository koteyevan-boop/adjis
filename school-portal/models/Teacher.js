const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  qualification: [{
    degree: String,
    institution: String,
    year: Number
  }],
  subjects: [{
    type: String
  }],
  assignedClasses: [{
    grade: String,
    section: String,
    subject: String
  }],
  joiningDate: {
    type: Date,
    default: Date.now
  },
  specialization: String,
  experience: Number
});

module.exports = mongoose.model('Teacher', teacherSchema);