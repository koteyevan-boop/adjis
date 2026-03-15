const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

const markAttendance = async (req, res) => {
  try {
    const { studentId, date, status, remarks } = req.body;

    const attendance = await Attendance.findOneAndUpdate(
      { student: studentId, date },
      {
        student: studentId,
        date,
        status,
        remarks,
        markedBy: req.user._id
      },
      { upsert: true, new: true }
    );

    res.json({
      message: 'Attendance marked successfully',
      attendance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bulkMarkAttendance = async (req, res) => {
  try {
    const { attendanceList } = req.body;
    
    const operations = attendanceList.map(record => ({
      updateOne: {
        filter: { student: record.studentId, date: record.date },
        update: {
          student: record.studentId,
          date: record.date,
          status: record.status,
          remarks: record.remarks,
          markedBy: req.user._id
        },
        upsert: true
      }
    }));

    await Attendance.bulkWrite(operations);

    res.json({ message: 'Bulk attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceByDate = async (req, res) => {
  try {
    const { date, grade, section } = req.query;
    
    const query = { date: new Date(date) };
    
    const attendance = await Attendance.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' }
      });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    const query = { student: studentId };
    
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const attendance = await Attendance.find(query).sort({ date: -1 });

    // Calculate statistics
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const late = attendance.filter(a => a.status === 'late').length;
    const halfDay = attendance.filter(a => a.status === 'half-day').length;

    res.json({
      records: attendance,
      statistics: {
        total,
        present,
        absent,
        late,
        halfDay,
        attendancePercentage: total > 0 ? (present / total) * 100 : 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  markAttendance,
  bulkMarkAttendance,
  getAttendanceByDate,
  getStudentAttendance
};