'use client';

import { useState } from 'react';
import { Mail, Phone, Bell, Calendar, DollarSign, Send, Upload, FileText, Image, Video, Music, Users, Clock, CheckCircle, AlertCircle, Settings, Filter, Search } from 'lucide-react';

interface EmailMessage {
  id: string;
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  attachments: FileAttachment[];
  status: 'draft' | 'sent' | 'failed';
  sentAt?: Date;
  scheduledAt?: Date;
  type: 'notification' | 'reminder' | 'fee_notice' | 'general';
}

interface SMSMessage {
  id: string;
  to: string[];
  message: string;
  status: 'draft' | 'sent' | 'failed';
  sentAt?: Date;
  scheduledAt?: Date;
  type: 'reminder' | 'alert' | 'fee_reminder';
}

interface FileAttachment {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'audio';
  size: number;
  url: string;
  uploadedAt: Date;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms';
  subject?: string;
  message: string;
  variables: string[];
}

export default function CommunicationHub() {
  const [activeTab, setActiveTab] = useState("email");
  const [messageType, setMessageType] = useState("notification");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isScheduleMode, setIsScheduleMode] = useState(false);

  // Sample data
  const [emailMessages, setEmailMessages] = useState<EmailMessage[]>([
    {
      id: "1",
      to: ["parent1@school.com", "parent2@school.com"],
      subject: "Mid-Term Examination Schedule",
      body: "Dear Parents, Please find attached the mid-term examination schedule for next week...",
      attachments: [],
      status: "sent",
      sentAt: new Date(),
      type: "notification"
    }
  ]);

  const [smsMessages, setSmsMessages] = useState<SMSMessage[]>([
    {
      id: "1",
      to: ["+233201234567", "+233201234568"],
      message: "Reminder: School closes early tomorrow at 12:30 PM for staff meeting.",
      status: "sent",
      sentAt: new Date(),
      type: "reminder"
    }
  ]);

  const templates: NotificationTemplate[] = [
    {
      id: "1",
      name: "Fee Payment Reminder",
      type: "sms",
      message: "Dear Parent, this is a reminder that school fees for {term} {year} are due by {due_date}. Please make payment to avoid late fees. Thank you. - ADJIS",
      variables: ["term", "year", "due_date"]
    },
    {
      id: "2",
      name: "Assignment Notification",
      type: "email",
      subject: "New Assignment Posted - {subject}",
      message: "Dear Parent, A new assignment has been posted for {student_name} in {subject}. Due date: {due_date}. Please check the parent portal for details.",
      variables: ["student_name", "subject", "due_date"]
    },
    {
      id: "3",
      name: "Event Reminder",
      type: "sms",
      message: "Reminder: {event_name} is scheduled for {event_date} at {event_time}. Please ensure your child attends. - ADJIS",
      variables: ["event_name", "event_date", "event_time"]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments: FileAttachment[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random().toString(),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 
              file.type.startsWith('audio/') ? 'audio' : 'document',
        size: file.size,
        url: URL.createObjectURL(file),
        uploadedAt: new Date()
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const sendEmail = async () => {
    const newEmail: EmailMessage = {
      id: Date.now().toString(),
      to: recipients,
      subject,
      body,
      attachments,
      status: isScheduleMode ? 'draft' : 'sent',
      scheduledAt: isScheduleMode ? new Date(`${scheduledDate}T${scheduledTime}`) : undefined,
      type: messageType as any
    };

    if (isScheduleMode) {
      // Schedule the email
      alert(`Email scheduled for ${scheduledDate} at ${scheduledTime}`);
    } else {
      // Send immediately via Gmail integration
      try {
        // In real implementation, this would call Gmail API
        alert(`Email sent to ${recipients.length} recipients via Gmail`);
        newEmail.sentAt = new Date();
      } catch (error) {
        newEmail.status = 'failed';
        alert('Failed to send email');
      }
    }

    setEmailMessages(prev => [newEmail, ...prev]);
    resetForm();
  };

  const sendSMS = async () => {
    const newSMS: SMSMessage = {
      id: Date.now().toString(),
      to: recipients,
      message: smsMessage,
      status: isScheduleMode ? 'draft' : 'sent',
      scheduledAt: isScheduleMode ? new Date(`${scheduledDate}T${scheduledTime}`) : undefined,
      type: messageType as any
    };

    if (isScheduleMode) {
      alert(`SMS scheduled for ${scheduledDate} at ${scheduledTime}`);
    } else {
      try {
        // In real implementation, this would call SMS API (Twilio, etc.)
        alert(`SMS sent to ${recipients.length} recipients`);
        newSMS.sentAt = new Date();
      } catch (error) {
        newSMS.status = 'failed';
        alert('Failed to send SMS');
      }
    }

    setSmsMessages(prev => [newSMS, ...prev]);
    resetForm();
  };

  const resetForm = () => {
    setRecipients([]);
    setSubject("");
    setBody("");
    setSmsMessage("");
    setAttachments([]);
    setScheduledDate("");
    setScheduledTime("");
    setIsScheduleMode(false);
  };

  const useTemplate = (template: NotificationTemplate) => {
    if (template.type === 'email') {
      setSubject(template.subject || '');
      setBody(template.message);
    } else {
      setSmsMessage(template.message);
    }
    setMessageType(template.type === 'email' ? 'notification' : 'reminder');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "email", label: "Email", icon: Mail },
              { id: "sms", label: "SMS", icon: Phone },
              { id: "templates", label: "Templates", icon: FileText },
              { id: "history", label: "History", icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "email" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Compose Email (Gmail Integration)</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Connected to Gmail</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Message Type Selection */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "notification", label: "General Notification", icon: Bell },
                    { id: "reminder", label: "Event Reminder", icon: Calendar },
                    { id: "fee_notice", label: "Fee Notice", icon: DollarSign },
                    { id: "general", label: "General", icon: Mail },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setMessageType(type.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        messageType === type.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700"
                      }`}
                    >
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter email addresses (comma separated)"
                      value={recipients.join(', ')}
                      onChange={(e) => setRecipients(e.target.value.split(',').map(r => r.trim()).filter(r => r))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Users className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    {recipients.length} recipients selected
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter your message here..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                      <Upload className="h-4 w-4" />
                      Upload Files
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mp3,.wav"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Settings className="h-4 w-4" />
                      Google Drive
                    </button>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {attachment.type === 'image' && <Image className="h-4 w-4 text-green-600" />}
                            {attachment.type === 'video' && <Video className="h-4 w-4 text-purple-600" />}
                            {attachment.type === 'audio' && <Music className="h-4 w-4 text-orange-600" />}
                            {attachment.type === 'document' && <FileText className="h-4 w-4 text-blue-600" />}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Scheduling */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={isScheduleMode}
                      onChange={(e) => setIsScheduleMode(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    Schedule for later
                  </label>
                </div>
                
                {isScheduleMode && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Send Button */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={sendEmail}
                  disabled={!recipients.length || !subject || !body}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {isScheduleMode ? 'Schedule Email' : 'Send Email'}
                </button>
              </div>
            </div>
          )}

          {activeTab === "sms" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Compose SMS</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">SMS Service Active</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Message Type Selection */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "reminder", label: "Reminder", icon: Bell },
                    { id: "alert", label: "Alert", icon: AlertCircle },
                    { id: "fee_reminder", label: "Fee Reminder", icon: DollarSign },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setMessageType(type.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        messageType === type.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700"
                      }`}
                    >
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Numbers</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter phone numbers (comma separated)"
                      value={recipients.join(', ')}
                      onChange={(e) => setRecipients(e.target.value.split(',').map(r => r.trim()).filter(r => r))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Users className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    {recipients.length} recipients selected
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-gray-500">({smsMessage.length}/160 characters)</span>
                </label>
                <textarea
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value.slice(0, 160))}
                  placeholder="Enter your SMS message..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <div className="text-sm text-gray-500 mt-1">
                  Standard SMS: 160 characters. Longer messages will be split into multiple SMS.
                </div>
              </div>

              {/* Scheduling */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={isScheduleMode}
                      onChange={(e) => setIsScheduleMode(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    Schedule for later
                  </label>
                </div>
                
                {isScheduleMode && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Send Button */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={sendSMS}
                  disabled={!recipients.length || !smsMessage}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {isScheduleMode ? 'Schedule SMS' : 'Send SMS'}
                </button>
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Message Templates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {template.type === 'email' ? (
                            <Mail className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Phone className="h-4 w-4 text-green-600" />
                          )}
                          <span className="text-sm text-gray-500">
                            {template.type === 'email' ? 'Email Template' : 'SMS Template'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => useTemplate(template)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Use Template
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {template.subject && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Subject:</p>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-700">Message:</p>
                        <p className="text-sm text-gray-600">{template.message}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Variables:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {template.variables.map((variable, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {variable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Communication History</h3>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Recent Emails</h4>
                  <div className="space-y-3">
                    {emailMessages.map((email) => (
                      <div key={email.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-gray-900">{email.subject}</span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              email.type === 'fee_notice' ? 'bg-orange-100 text-orange-800' :
                              email.type === 'reminder' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {email.type.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">To: {email.to.join(', ')}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Status: {email.status}</span>
                            {email.sentAt && <span>Sent: {email.sentAt.toLocaleString()}</span>}
                            {email.scheduledAt && <span>Scheduled: {email.scheduledAt.toLocaleString()}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {email.status === 'sent' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {email.status === 'failed' && <AlertCircle className="h-4 w-4 text-red-600" />}
                          {email.attachments.length > 0 && (
                            <span className="text-xs text-gray-500">{email.attachments.length} attachments</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Recent SMS</h4>
                  <div className="space-y-3">
                    {smsMessages.map((sms) => (
                      <div key={sms.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-gray-900">SMS Message</span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              sms.type === 'fee_reminder' ? 'bg-orange-100 text-orange-800' :
                              sms.type === 'alert' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {sms.type.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1 truncate">{sms.message}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>To: {sms.to.length} recipients</span>
                            <span>Status: {sms.status}</span>
                            {sms.sentAt && <span>Sent: {sms.sentAt.toLocaleString()}</span>}
                            {sms.scheduledAt && <span>Scheduled: {sms.scheduledAt.toLocaleString()}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {sms.status === 'sent' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {sms.status === 'failed' && <AlertCircle className="h-4 w-4 text-red-600" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
