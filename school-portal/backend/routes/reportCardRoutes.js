const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  generateReportCard,
  getStudentReportCards,
  getReportCard,
  exportReportCardPDF,
  publishReportCard,
  bulkGenerateReportCards
} = require('../controllers/reportCardController');

router.post('/generate/:studentId/:examId', 
  authenticate, 
  authorize('admin', 'teacher'), 
  generateReportCard
);

router.post('/bulk-generate', 
  authenticate, 
  authorize('admin'), 
  bulkGenerateReportCards
);

router.get('/student/:studentId', 
  authenticate, 
  getStudentReportCards
);

router.get('/:id', 
  authenticate, 
  getReportCard
);

router.get('/:id/pdf', 
  authenticate, 
  exportReportCardPDF
);

router.put('/:id/publish', 
  authenticate, 
  authorize('admin'), 
  publishReportCard
);

module.exports = router;