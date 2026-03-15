const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  createFeeStructure,
  getFeeStructures,
  updateFeeStructure,
  deleteFeeStructure,
  createFeePayment,
  getStudentFeeDetails,
  getFeePayments,
  getFeePayment,
  createFeeConcession,
  getFeeConcessions,
  updateFeeConcession,
  getFeeCollectionReport,
  getDueFeesReport
} = require('../controllers/feeController');

// Fee Structure routes
router.post('/structures', 
  authenticate, 
  authorize('admin'), 
  createFeeStructure
);

router.get('/structures', 
  authenticate, 
  authorize('admin', 'teacher'), 
  getFeeStructures
);

router.put('/structures/:id', 
  authenticate, 
  authorize('admin'), 
  updateFeeStructure
);

router.delete('/structures/:id', 
  authenticate, 
  authorize('admin'), 
  deleteFeeStructure
);

// Fee Payment routes
router.post('/payments', 
  authenticate, 
  authorize('admin', 'accountant'), 
  createFeePayment
);

router.get('/payments', 
  authenticate, 
  authorize('admin', 'accountant', 'teacher'), 
  getFeePayments
);

router.get('/payments/:id', 
  authenticate, 
  authorize('admin', 'accountant'), 
  getFeePayment
);

router.get('/student/:studentId', 
  authenticate, 
  getStudentFeeDetails
);

// Fee Concession routes
router.post('/concessions', 
  authenticate, 
  authorize('admin'), 
  createFeeConcession
);

router.get('/concessions', 
  authenticate, 
  authorize('admin', 'teacher'), 
  getFeeConcessions
);

router.put('/concessions/:id', 
  authenticate, 
  authorize('admin'), 
  updateFeeConcession
);

// Reports
router.get('/reports/collection', 
  authenticate, 
  authorize('admin', 'accountant'), 
  getFeeCollectionReport
);

router.get('/reports/due', 
  authenticate, 
  authorize('admin', 'accountant'), 
  getDueFeesReport
);

module.exports = router;