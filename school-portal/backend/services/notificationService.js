const twilio = require('twilio');
const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');

class NotificationService {
  constructor() {
    // Initialize Twilio for SMS
    this.twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
      ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
      : null;

    // Initialize Email transporter
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send SMS
  async sendSMS(to, message, options = {}) {
    try {
      if (!this.twilioClient) {
        console.log('Twilio not configured. SMS would be:', { to, message });
        return { success: false, message: 'SMS service not configured' };
      }

      const result = await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: this.formatPhoneNumber(to)
      });

      return { success: true, result };
    } catch (error) {
      console.error('SMS sending error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send Email
  async sendEmail(to, subject, html, options = {}) {
    try {
      const mailOptions = {
        from: `"${process.env.SCHOOL_NAME || 'School Portal'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        ...options
      };

      const result = await this.emailTransporter.sendMail(mailOptions);
      return { success: true, result };
    } catch (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send bulk SMS
  async sendBulkSMS(recipients, message) {
    const results = [];
    for (const recipient of recipients) {
      const result = await this.sendSMS(recipient.phone, this.personalizeMessage(message, recipient));
      results.push({ recipient, result });
      
      // Add delay to avoid rate limiting
      await this.delay(100);
    }
    return results;
  }

  // Send bulk Email
  async sendBulkEmail(recipients, subject, template, data = {}) {
    const results = [];
    for (const recipient of recipients) {
      const html = this.renderTemplate(template, { ...data, ...recipient });
      const result = await this.sendEmail(recipient.email, subject, html);
      results.push({ recipient, result });
    }
    return results;
  }

  // Format phone number
  formatPhoneNumber(phone) {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (cleaned.length === 10) {
      cleaned = process.env.COUNTRY_CODE + cleaned;
    }
    
    return '+' + cleaned;
  }

  // Personalize message
  personalizeMessage(message, recipient) {
    return message.replace(/{(\w+)}/g, (match, key) => {
      return recipient[key] || match;
    });
  }

  // Render email template
  renderTemplate(template, data) {
    return template.replace(/{(\w+)}/g, (match, key) => {
      return data[key] || match;
    });
  }

  // Delay helper
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Create and send notification
  async createAndSendNotification(userId, notificationData, sendSMS = false, sendEmail = false) {
    try {
      // Save to database
      const notification = new Notification({
        recipient: userId,
        ...notificationData
      });
      await notification.save();

      // Get user details for SMS/Email
      const User = require('../models/User');
      const user = await User.findById(userId);

      // Send SMS if requested and user has phone
      if (sendSMS && user.phoneNumber) {
        await this.sendSMS(user.phoneNumber, notificationData.message);
      }

      // Send Email if requested and user has email
      if (sendEmail && user.email) {
        await this.sendEmail(user.email, notificationData.title, notificationData.message);
      }

      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }
}

module.exports = new NotificationService();