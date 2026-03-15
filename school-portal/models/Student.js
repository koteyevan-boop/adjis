const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  grade: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  parentInfo: {
    fatherName: String,
    fatherPhone: String,
    motherName: String,
    motherPhone: String,
    email: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  medicalInfo: {
    bloodGroup: String,
    allergies: String,
    medications: String
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }]
});

module.exports = mongoose.model('Student', studentSchema);