const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/auth');
const {
  createAssignment,
  getAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  uploadDocument,
  getDocuments,
  downloadDocument,
  deleteDocument
} = require('../controllers/fileController');

// Assignment routes
router.post('/assignments', 
  authenticate, 
  authorize('admin', 'teacher'), 
  upload.array('attachments', 5), 
  createAssignment
);

router.get('/assignments', 
  authenticate, 
  getAssignments
);

router.get('/assignments/:id', 
  authenticate, 
  getAssignment
);

router.put('/assignments/:id', 
  authenticate, 
  authorize('admin', 'teacher'), 
  updateAssignment
);

router.delete('/assignments/:id', 
  authenticate, 
  authorize('admin', 'teacher'), 
  deleteAssignment
);

// Submission routes
router.post('/submissions/:assignmentId', 
  authenticate, 
  authorize('student'), 
  upload.array('attachments', 5), 
  submitAssignment
);

router.get('/submissions/:assignmentId', 
  authenticate, 
  authorize('admin', 'teacher'), 
  getSubmissions
);

router.post('/submissions/:submissionId/grade', 
  authenticate, 
  authorize('admin', 'teacher'), 
  gradeSubmission
);

// Document routes
router.post('/documents', 
  authenticate, 
  upload.single('document'), 
  uploadDocument
);

router.get('/documents', 
  authenticate, 
  getDocuments
);

router.get('/documents/:id/download', 
  authenticate, 
  downloadDocument
);

router.delete('/documents/:id', 
  authenticate, 
  authorize('admin'), 
  deleteDocument
);

module.exports = router;