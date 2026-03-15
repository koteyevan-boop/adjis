const express = require('express');
const router = express.Router();
const {
  addGrade,
  getStudentGrades,
  generateReportCard
} = require('../controllers/gradeController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin', 'teacher'), addGrade);
router.get('/student/:studentId', authenticate, getStudentGrades);
router.get('/report/:studentId/:examType/:academicYear', authenticate, generateReportCard);

module.exports = router;