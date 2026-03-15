const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  sendBulkNotification,
  sendAttendanceNotification,
  sendGradeNotification,
  sendExamReminder,
  sendFeeDueReminder,
  getNotificationStats
} = require('../controllers/notificationController');

// User notifications
router.get('/', 
  authenticate, 
  getUserNotifications
);

router.get('/stats', 
  authenticate, 
  getNotificationStats
);

router.put('/:id/read', 
  authenticate, 
  markAsRead
);

router.put('/read-all', 
  authenticate, 
  markAllAsRead
);

router.delete('/:id', 
  authenticate, 
  deleteNotification
);

// Bulk notifications (admin only)
router.post('/bulk', 
  authenticate, 
  authorize('admin'), 
  sendBulkNotification
);

// Specific notifications
router.post('/attendance', 
  authenticate, 
  authorize('admin', 'teacher'), 
  sendAttendanceNotification
);

router.post('/grade', 
  authenticate, 
  authorize('admin', 'teacher'), 
  sendGradeNotification
);

router.post('/exam-reminder', 
  authenticate, 
  authorize('admin'), 
  sendExamReminder
);

router.post('/fee-reminder', 
  authenticate, 
  authorize('admin', 'accountant'), 
  sendFeeDueReminder
);

module.exports = router;