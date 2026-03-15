const express = require('express');
const router = express.Router();
const {
  markAttendance,
  bulkMarkAttendance,
  getAttendanceByDate,
  getStudentAttendance
} = require('../controllers/attendanceController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'teacher'), markAttendance);
router.post('/bulk', authenticate, authorize('admin', 'teacher'), bulkMarkAttendance);
router.get('/', authenticate, getAttendanceByDate);
router.get('/student/:studentId', authenticate, getStudentAttendance);

module.exports = router;