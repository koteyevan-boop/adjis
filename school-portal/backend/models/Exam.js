const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    enum: ['quarterly', 'half-yearly', 'annual', 'unit-test', 'pre-board'],
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  classes: [{
    grade: String,
    sections: [String]
  }],
  subjects: [{
    name: String,
    code: String,
    date: Date,
    startTime: String,
    endTime: String,
    duration: Number, // in minutes
    totalMarks: Number,
    passingMarks: Number,
    syllabus: String,
    room: String
  }],
  instructions: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'ongoing', 'completed'],
    default: 'draft'
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

module.exports = mongoose.model('Exam', examSchema);