const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  generateAIComment,
  getStudentExamComments,
  updateComment,
  bulkGenerateComments,
  getCommentTemplates
} = require('../controllers/commentController');

router.post('/generate-ai', 
  authenticate, 
  authorize('admin', 'teacher'), 
  generateAIComment
);

router.post('/bulk-generate', 
  authenticate, 
  authorize('admin'), 
  bulkGenerateComments
);

router.get('/templates', 
  authenticate, 
  getCommentTemplates
);

router.get('/student/:studentId/exam/:examId', 
  authenticate, 
  getStudentExamComments
);

router.put('/:commentId', 
  authenticate, 
  authorize('admin', 'teacher'), 
  updateComment
);

module.exports = router;