const mongoose = require('mongoose');

const reportCardSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  term: {
    type: String,
    enum: ['quarterly', 'half-yearly', 'annual'],
    required: true
  },
  subjects: [{
    name: String,
    code: String,
    marksObtained: Number,
    totalMarks: Number,
    percentage: Number,
    grade: String,
    comments: {
      teacher: String,
      ai: String,
      final: String
    }
  }],
  attendance: {
    totalDays: Number,
    presentDays: Number,
    percentage: Number
  },
  coCurricular: [{
    activity: String,
    grade: String,
    remarks: String
  }],
  conduct: {
    grade: String,
    remarks: String
  },
  classTeacherRemarks: String,
  principalRemarks: String,
  result: {
    type: String,
    enum: ['PASS', 'FAIL', 'PROMOTED', 'NOT_PROMOTED'],
    required: true
  },
  percentage: Number,
  rank: Number,
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  pdfUrl: String
});

module.exports = mongoose.model('ReportCard', reportCardSchema);