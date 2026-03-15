const Notification = require('../models/Notification');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const notificationService = require('../services/notificationService');

// Get user notifications
const getUserNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    const query = { recipient: req.user._id };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notification.countDocuments(query);

    res.json({
      notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send bulk notification
const sendBulkNotification = async (req, res) => {
  try {
    const { recipientType, grades, sections, title, message, type, priority, sendSMS, sendEmail } = req.body;

    let recipients = [];

    // Get recipients based on type
    if (recipientType === 'all') {
      const users = await User.find({ isActive: true });
      recipients = users.map(u => u._id);
    } else if (recipientType === 'students') {
      const query = {};
      if (grades && grades.length > 0) {
        query.grade = { $in: grades };
      }
      if (sections && sections.length > 0) {
        query.section = { $in: sections };
      }
      
      const students = await Student.find(query).populate('user');
      recipients = students.map(s => s.user._id);
    } else if (recipientType === 'teachers') {
      const teachers = await Teacher.find().populate('user');
      recipients = teachers.map(t => t.user._id);
    } else if (recipientType === 'admins') {
      const admins = await User.find({ role: 'admin', isActive: true });
      recipients = admins.map(a => a._id);
    }

    // Create notifications
    const notifications = [];
    for (const recipientId of recipients) {
      const notification = new Notification({
        recipient: recipientId,
        title,
        message,
        type,
        priority
      });
      await notification.save();
      notifications.push(notification);

      // Send SMS/Email if requested
      if (sendSMS || sendEmail) {
        const user = await User.findById(recipientId);
        
        if (sendSMS && user.phoneNumber) {
          await notificationService.sendSMS(user.phoneNumber, message);
        }
        
        if (sendEmail && user.email) {
          await notificationService.sendEmail(user.email, title, message);
        }
      }
    }

    // Emit real-time notifications
    const io = req.app.get('io');
    recipients.forEach(recipientId => {
      io.to(recipientId.toString()).emit('newNotification', {
        count: notifications.length
      });
    });

    res.status(201).json({
      message: `Notification sent to ${recipients.length} recipients`,
      count: recipients.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send attendance notification
const sendAttendanceNotification = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    const student = await Student.findById(studentId).populate('user');
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const parentMessage = `Your child ${student.user.name} was marked ${status} on ${new Date(date).toLocaleDateString()}.`;
    const studentMessage = `Your attendance for ${new Date(date).toLocaleDateString()} has been marked as ${status}.`;

    // Send to parents
    if (student.parentInfo?.email) {
      await notificationService.sendEmail(
        student.parentInfo.email,
        'Attendance Notification',
        parentMessage
      );
    }

    if (student.parentInfo?.fatherPhone) {
      await notificationService.sendSMS(
        student.parentInfo.fatherPhone,
        parentMessage
      );
    }

    // Send to student
    await notificationService.createAndSendNotification(
      student.user._id,
      {
        title: 'Attendance Marked',
        message: studentMessage,
        type: 'attendance',
        priority: 'medium'
      },
      true, // Send SMS
      true  // Send Email
    );

    res.json({ message: 'Attendance notifications sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send grade notification
const sendGradeNotification = async (req, res) => {
  try {
    const { studentId, subject, marks, total, examType } = req.body;

    const student = await Student.findById(studentId).populate('user');
    const percentage = (marks / total) * 100;

    const message = `${student.user.name} scored ${marks}/${total} (${percentage.toFixed(1)}%) in ${subject} (${examType} exam).`;

    // Send to parents
    if (student.parentInfo?.email) {
      await notificationService.sendEmail(
        student.parentInfo.email,
        'Grade Notification',
        message
      );
    }

    // Send to student
    await notificationService.createAndSendNotification(
      student.user._id,
      {
        title: 'Grade Published',
        message,
        type: 'grade',
        priority: 'high'
      },
      true,
      true
    );

    res.json({ message: 'Grade notifications sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send exam reminder
const sendExamReminder = async (req, res) => {
  try {
    const { examId, subject, date, time, grade, section } = req.body;

    const students = await Student.find({ grade, section }).populate('user');

    const message = `Reminder: ${subject} exam on ${new Date(date).toLocaleDateString()} at ${time}. Please be prepared.`;

    for (const student of students) {
      await notificationService.createAndSendNotification(
        student.user._id,
        {
          title: 'Exam Reminder',
          message,
          type: 'event',
          priority: 'high'
        },
        true,
        true
      );

      // Send to parents
      if (student.parentInfo?.email) {
        await notificationService.sendEmail(
          student.parentInfo.email,
          'Exam Reminder',
          message
        );
      }
    }

    res.json({ message: `Reminders sent to ${students.length} students` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send fee due reminder
const sendFeeDueReminder = async (req, res) => {
  try {
    const { studentId, amount, dueDate, feeType } = req.body;

    const student = await Student.findById(studentId).populate('user');

    const message = `Fee reminder: ${feeType} fee of ₹${amount} is due on ${new Date(dueDate).toLocaleDateString()}. Please pay before due date.`;

    // Send to parents
    if (student.parentInfo?.email) {
      await notificationService.sendEmail(
        student.parentInfo.email,
        'Fee Due Reminder',
        message
      );
    }

    if (student.parentInfo?.fatherPhone) {
      await notificationService.sendSMS(
        student.parentInfo.fatherPhone,
        message
      );
    }

    res.json({ message: 'Fee reminder sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notification statistics
const getNotificationStats = async (req, res) => {
  try {
    const stats = await Notification.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            isRead: '$isRead'
          },
          count: { $sum: 1 }
        }
      }
    ]);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });

    res.json({
      unreadCount,
      breakdown: stats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
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
};