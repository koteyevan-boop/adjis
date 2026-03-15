const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  createExam,
  getExams,
  getExam,
  updateExam,
  deleteExam,
  publishExam,
  getExamSchedule,
  registerStudent,
  getExamRegistrations,
  generateHallTicket,
  markExamAttendance
} = require('../controllers/examController');

router.post('/', 
  authenticate, 
  authorize('admin'), 
  createExam
);

router.get('/', 
  authenticate, 
  getExams
);

router.get('/schedule', 
  authenticate, 
  getExamSchedule
);

router.get('/:id', 
  authenticate, 
  getExam
);

router.put('/:id', 
  authenticate, 
  authorize('admin'), 
  updateExam
);

router.delete('/:id', 
  authenticate, 
  authorize('admin'), 
  deleteExam
);

router.post('/:id/publish', 
  authenticate, 
  authorize('admin'), 
  publishExam
);

router.post('/:examId/register', 
  authenticate, 
  authorize('admin'), 
  registerStudent
);

router.get('/:examId/registrations', 
  authenticate, 
  authorize('admin', 'teacher'), 
  getExamRegistrations
);

router.get('/:examId/hallticket/:studentId', 
  authenticate, 
  generateHallTicket
);

router.post('/:examId/attendance/:subjectCode', 
  authenticate, 
  authorize('admin', 'teacher'), 
  markExamAttendance
);

module.exports = router;