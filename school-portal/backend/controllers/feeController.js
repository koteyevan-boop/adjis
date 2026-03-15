const FeeStructure = require('../models/FeeStructure');
const FeePayment = require('../models/FeePayment');
const FeeConcession = require('../models/FeeConcession');
const Student = require('../models/Student');

// Fee Structure Controllers
const createFeeStructure = async (req, res) => {
  try {
    const feeData = req.body;

    const feeStructure = new FeeStructure({
      ...feeData,
      createdBy: req.user._id
    });

    await feeStructure.save();

    res.status(201).json({
      message: 'Fee structure created successfully',
      feeStructure
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeeStructures = async (req, res) => {
  try {
    const { academicYear, grade, category, isActive } = req.query;
    const query = {};

    if (academicYear) query.academicYear = academicYear;
    if (grade) query.grade = grade;
    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const feeStructures = await FeeStructure.find(query)
      .sort({ grade: 1, category: 1 });

    res.json(feeStructures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFeeStructure = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!feeStructure) {
      return res.status(404).json({ error: 'Fee structure not found' });
    }

    res.json({
      message: 'Fee structure updated successfully',
      feeStructure
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFeeStructure = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findById(req.params.id);

    if (!feeStructure) {
      return res.status(404).json({ error: 'Fee structure not found' });
    }

    await feeStructure.remove();

    res.json({ message: 'Fee structure deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fee Payment Controllers
const createFeePayment = async (req, res) => {
  try {
    const paymentData = req.body;

    // Generate receipt number
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await FeePayment.countDocuments() + 1;
    const receiptNumber = `RCP-${year}${month}-${count.toString().padStart(6, '0')}`;

    const feePayment = new FeePayment({
      ...paymentData,
      receiptNumber,
      receivedBy: req.user._id
    });

    await feePayment.save();

    res.status(201).json({
      message: 'Fee payment recorded successfully',
      feePayment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentFeeDetails = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { academicYear } = req.query;

    const student = await Student.findById(studentId).populate('user', 'name email');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Get fee structure for student's grade
    const feeStructures = await FeeStructure.find({
      academicYear,
      grade: student.grade,
      isActive: true
    });

    // Get existing payments
    const payments = await FeePayment.find({
      student: studentId
    }).populate('feeStructure');

    // Get concessions
    const concessions = await FeeConcession.find({
      student: studentId,
      academicYear,
      status: 'active'
    });

    // Calculate total fee and paid amount
    let totalFee = 0;
    let totalPaid = 0;
    const feeBreakdown = [];

    for (const fee of feeStructures) {
      let feeAmount = fee.amount;
      
      // Apply concessions
      for (const concession of concessions) {
        if (concession.applicableFees.includes('all') || 
            concession.applicableFees.includes(fee.category)) {
          feeAmount = feeAmount * (1 - concession.percentage / 100);
        }
      }

      const paidForFee = payments
        .filter(p => p.feeStructure._id.equals(fee._id))
        .reduce((sum, p) => sum + p.paidAmount, 0);

      totalFee += feeAmount;
      totalPaid += paidForFee;

      feeBreakdown.push({
        category: fee.category,
        originalAmount: fee.amount,
        discountedAmount: feeAmount,
        paid: paidForFee,
        due: feeAmount - paidForFee,
        status: paidForFee >= feeAmount ? 'paid' : paidForFee > 0 ? 'partial' : 'pending'
      });
    }

    res.json({
      student: {
        id: student._id,
        name: student.user.name,
        studentId: student.studentId,
        grade: student.grade,
        section: student.section
      },
      academicYear,
      summary: {
        totalFee,
        totalPaid,
        totalDue: totalFee - totalPaid,
        paymentStatus: totalPaid >= totalFee ? 'paid' : totalPaid > 0 ? 'partial' : 'pending'
      },
      feeBreakdown,
      recentPayments: payments.slice(0, 5),
      concessions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeePayments = async (req, res) => {
  try {
    const { studentId, startDate, endDate, status } = req.query;
    const query = {};

    if (studentId) query.student = studentId;
    if (status) query.status = status;
    
    if (startDate || endDate) {
      query.paymentDate = {};
      if (startDate) query.paymentDate.$gte = new Date(startDate);
      if (endDate) query.paymentDate.$lte = new Date(endDate);
    }

    const payments = await FeePayment.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' }
      })
      .populate('feeStructure')
      .populate('receivedBy', 'name')
      .sort({ paymentDate: -1 });

    // Calculate totals
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalCollected = payments.reduce((sum, p) => sum + p.paidAmount, 0);

    res.json({
      payments,
      statistics: {
        totalPayments: payments.length,
        totalAmount,
        totalCollected,
        pendingAmount: totalAmount - totalCollected
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeePayment = async (req, res) => {
  try {
    const payment = await FeePayment.findById(req.params.id)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' }
      })
      .populate('feeStructure')
      .populate('receivedBy', 'name');

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fee Concession Controllers
const createFeeConcession = async (req, res) => {
  try {
    const concessionData = req.body;

    const concession = new FeeConcession({
      ...concessionData,
      approvedBy: req.user._id
    });

    await concession.save();

    res.status(201).json({
      message: 'Fee concession created successfully',
      concession
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeeConcessions = async (req, res) => {
  try {
    const { studentId, academicYear, status } = req.query;
    const query = {};

    if (studentId) query.student = studentId;
    if (academicYear) query.academicYear = academicYear;
    if (status) query.status = status;

    const concessions = await FeeConcession.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name email' }
      })
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(concessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFeeConcession = async (req, res) => {
  try {
    const concession = await FeeConcession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!concession) {
      return res.status(404).json({ error: 'Concession not found' });
    }

    res.json({
      message: 'Fee concession updated successfully',
      concession
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reports
const getFeeCollectionReport = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    const matchQuery = {};
    if (startDate || endDate) {
      matchQuery.paymentDate = {};
      if (startDate) matchQuery.paymentDate.$gte = new Date(startDate);
      if (endDate) matchQuery.paymentDate.$lte = new Date(endDate);
    }

    const payments = await FeePayment.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: 'feestructures',
          localField: 'feeStructure',
          foreignField: '_id',
          as: 'feeInfo'
        }
      },
      { $unwind: '$feeInfo' },
      {
        $group: {
          _id: {
            category: '$feeInfo.category',
            paymentMode: '$paymentMode',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$paymentDate' } }
          },
          totalAmount: { $sum: '$paidAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': -1 } }
    ]);

    // Calculate summary
    const summary = await FeePayment.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalCollected: { $sum: '$paidAmount' },
          totalPayments: { $sum: 1 },
          averageAmount: { $avg: '$paidAmount' }
        }
      }
    ]);

    res.json({
      payments,
      summary: summary[0] || {
        totalCollected: 0,
        totalPayments: 0,
        averageAmount: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDueFeesReport = async (req, res) => {
  try {
    const { academicYear, grade } = req.query;

    // Get all students
    const studentQuery = {};
    if (grade) studentQuery.grade = grade;

    const students = await Student.find(studentQuery)
      .populate('user', 'name email');

    const dueReport = [];

    for (const student of students) {
      // Get fee structures for student's grade
      const feeStructures = await FeeStructure.find({
        academicYear,
        grade: student.grade,
        isActive: true
      });

      // Get payments
      const payments = await FeePayment.find({
        student: student._id
      });

      // Get concessions
      const concessions = await FeeConcession.find({
        student: student._id,
        academicYear,
        status: 'active'
      });

      let totalFee = 0;
      let totalPaid = 0;

      for (const fee of feeStructures) {
        let feeAmount = fee.amount;
        
        for (const concession of concessions) {
          if (concession.applicableFees.includes('all') || 
              concession.applicableFees.includes(fee.category)) {
            feeAmount = feeAmount * (1 - concession.percentage / 100);
          }
        }

        const paidForFee = payments
          .filter(p => p.feeStructure.equals(fee._id))
          .reduce((sum, p) => sum + p.paidAmount, 0);

        totalFee += feeAmount;
        totalPaid += paidForFee;
      }

      if (totalPaid < totalFee) {
        dueReport.push({
          student: {
            id: student._id,
            name: student.user.name,
            studentId: student.studentId,
            grade: student.grade,
            section: student.section
          },
          totalFee,
          totalPaid,
          dueAmount: totalFee - totalPaid,
          lastPaymentDate: payments.length > 0 ? payments[0].paymentDate : null
        });
      }
    }

    // Sort by due amount (highest first)
    dueReport.sort((a, b) => b.dueAmount - a.dueAmount);

    res.json({
      totalDue: dueReport.length,
      totalAmount: dueReport.reduce((sum, s) => sum + s.dueAmount, 0),
      students: dueReport
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
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
};