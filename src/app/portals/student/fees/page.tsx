'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, FileText, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import PortalGuard from '@/components/PortalGuard';
import { dbService, FeeRecord, mockFeeRecords } from '@/lib/database-service';

export default function StudentFeesPage() {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFeeRecords();
  }, []);

  const fetchFeeRecords = async () => {
    try {
      const data = await dbService.getFeeRecords('current-student-id').catch(() => mockFeeRecords);
      setFeeRecords(data);
    } catch (error) {
      console.error('Error fetching fee records:', error);
      setFeeRecords(mockFeeRecords);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = (fee: FeeRecord) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const submitPayment = async () => {
    if (!selectedFee || !paymentMethod || !transactionId) {
      alert('Please fill in all payment details');
      return;
    }

    setSubmitting(true);
    try {
      await dbService.updateFeePayment(selectedFee.id, {
        paidDate: new Date().toISOString().split('T')[0],
        paymentMethod,
        transactionId,
      });

      setShowPaymentModal(false);
      setSelectedFee(null);
      setPaymentMethod('');
      setTransactionId('');
      fetchFeeRecords();
      
      alert('Payment recorded successfully!');
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('Failed to record payment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getTotalPaid = () => {
    return feeRecords.filter(fee => fee.status === 'paid').reduce((sum, fee) => sum + fee.amount, 0);
  };

  const getTotalPending = () => {
    return feeRecords.filter(fee => fee.status === 'pending').reduce((sum, fee) => sum + fee.amount, 0);
  };

  const getTotalOverdue = () => {
    return feeRecords.filter(fee => fee.status === 'overdue').reduce((sum, fee) => sum + fee.amount, 0);
  };

  if (loading) {
    return (
      <PortalGuard portalType="student">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PortalGuard>
    );
  }

  return (
    <PortalGuard portalType="student">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/portals/student" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-xl font-bold text-gray-900">Fees</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${getTotalPaid().toLocaleString()}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    ${getTotalPending().toLocaleString()}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${getTotalOverdue().toLocaleString()}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Fee Records */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Fee Records</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Term/Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feeRecords.map((fee) => {
                    const overdue = isOverdue(fee.dueDate) && fee.status === 'pending';
                    
                    return (
                      <tr key={fee.id} className={overdue ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {fee.term} {fee.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {fee.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${fee.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(fee.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            fee.status === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : overdue
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {fee.status === 'paid' ? 'Paid' : overdue ? 'Overdue' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {fee.status === 'paid' ? (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">
                                Paid on {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString() : 'Unknown'}
                              </span>
                              {fee.transactionId && (
                                <button className="text-blue-600 hover:text-blue-800">
                                  <FileText className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => handlePayment(fee)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Record Payment
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {feeRecords.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No fee records</h3>
              <p className="text-gray-600">You don't have any fee records at the moment.</p>
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedFee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Record Payment - {selectedFee.description}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Amount: <span className="font-semibold">${selectedFee.amount.toLocaleString()}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Due Date: <span className="font-semibold">{new Date(selectedFee.dueDate).toLocaleDateString()}</span>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select payment method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Cash">Cash</option>
                  <option value="Check">Check</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID / Reference
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter transaction ID or reference number"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedFee(null);
                    setPaymentMethod('');
                    setTransactionId('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitPayment}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Recording...' : 'Record Payment'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalGuard>
  );
}
