const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  location: String,
  type: {
    type: String,
    enum: ['academic', 'holiday', 'exam', 'meeting', 'sports', 'cultural'],
    required: true
  },
  targetAudience: [{
    type: String,
    enum: ['all', 'students', 'teachers', 'admins']
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Event', eventSchema);