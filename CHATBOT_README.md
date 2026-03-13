# ADJIS Chatbot System

A comprehensive AI-powered chatbot system for Adorable Babies & Josemaria International School (ADJIS) that provides both automated responses and human agent connections through multiple channels.

## 🚀 Features

### AI-Powered Chat
- **Natural Language Processing**: Understands and responds to user queries about admissions, programs, and school information
- **Contextual Responses**: Provides relevant answers based on conversation history
- **Fallback Logic**: Graceful handling when AI is unavailable
- **Typing Indicators**: Visual feedback when the bot is "thinking"

### Human Agent Integration
- **Live Chat Connection**: Connect to human agents (Admissions Counselor, Academic Advisor, Support Specialist)
- **Agent Availability**: Real-time status checking and wait time estimates
- **Seamless Handover**: Smooth transition from AI to human agents
- **Agent Profiles**: Display agent name and specialization

### Multi-Channel Support
- **WhatsApp Integration**: Direct WhatsApp connection with pre-filled messages
- **Phone Support**: Click-to-call functionality
- **Email Integration**: Pre-composed email templates
- **Business Hours**: Automatic availability checking

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Screen reader support and keyboard navigation
- **Real-time Status**: Business hours and agent availability indicators

## 📁 File Structure

```
src/
├── components/
│   ├── Chatbot.tsx              # Basic chatbot component
│   └── AdvancedChatbot.tsx      # Full-featured chatbot with API integration
├── config/
│   └── chatbot.ts               # Chatbot configuration and settings
├── app/
│   └── api/
│       └── chatbot/
│           └── route.ts         # API endpoints for chat functionality
└── app/
    └── page.tsx                 # Homepage with chatbot integration
```

## ⚙️ Configuration

### Chatbot Settings (`src/config/chatbot.ts`)

```typescript
export const CHATBOT_CONFIG = {
  school: {
    name: "Adorable Babies & Josemaria International School",
    abbreviation: "ADJIS",
    contact: {
      phone: "+233302000000",
      whatsapp: "+233201234567",
      email: "admissions@adjis.edu.gh"
    }
  },
  agents: {
    admissions: {
      name: "Sarah Johnson",
      type: "Admissions Counselor",
      workingHours: "8:00 AM - 4:00 PM GMT"
    },
    // ... more agents
  }
};
```

### Customization Options

1. **Update Contact Information**: Modify phone numbers, email addresses in `chatbot.ts`
2. **Agent Configuration**: Add or modify human agents with their specializations
3. **AI Responses**: Customize automated responses for different query types
4. **Business Hours**: Set working hours for availability checking
5. **Styling**: Modify colors and layout to match school branding

## 🔧 Installation & Setup

### 1. Dependencies
Ensure you have the required dependencies installed:

```bash
npm install lucide-react
```

### 2. Environment Variables
Create a `.env.local` file for sensitive configuration:

```env
# OpenAI API (optional - for advanced AI features)
OPENAI_API_KEY=your_openai_api_key

# WhatsApp Business API (optional)
WHATSAPP_API_TOKEN=your_whatsapp_token

# Analytics (optional)
CHATBOT_ANALYTICS_ENABLED=true
```

### 3. Integration
Add the chatbot to any page:

```tsx
import AdvancedChatbot from '@/components/AdvancedChatbot';

export default function YourPage() {
  return (
    <div>
      {/* Your page content */}
      <AdvancedChatbot />
    </div>
  );
}
```

## 🤖 AI Integration

### Current Implementation
- **Rule-based responses**: Pre-defined responses for common queries
- **Fallback logic**: Graceful handling when API is unavailable
- **Context awareness**: Uses conversation history for better responses

### Advanced AI Options
To integrate with OpenAI or other AI services:

1. **Update API Endpoint** (`src/app/api/chatbot/route.ts`):
```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
  }),
});
```

2. **Custom Prompts**: Add school-specific context to AI responses
3. **Training Data**: Use school documents to train custom models

## 📞 Human Agent Integration

### Live Chat Systems
Integrate with popular live chat platforms:

- **Intercom**: Use Intercom's JavaScript API
- **Zendesk Chat**: Integrate with Zendesk Chat widget
- **LiveChat**: Connect to LiveChat API
- **Custom Solution**: Build your own agent interface

### Agent Workflow
1. **User Request**: User asks to connect to human agent
2. **Availability Check**: System checks agent availability
3. **Connection**: User is connected to available agent
4. **Handover**: Conversation history is transferred to agent
5. **Follow-up**: Agent can continue conversation or escalate

## 📱 External Channel Setup

### WhatsApp Integration
1. **WhatsApp Business API**: Set up WhatsApp Business account
2. **Webhook Configuration**: Configure webhook for message handling
3. **Phone Number**: Use verified WhatsApp business number
4. **Message Templates**: Create approved message templates

### Phone System
1. **PBX Integration**: Connect with school phone system
2. **Call Routing**: Route calls to appropriate departments
3. **Voicemail**: Set up voicemail for after-hours calls
4. **Analytics**: Track call volume and response times

### Email Integration
1. **SMTP Configuration**: Set up email server settings
2. **Templates**: Create email templates for different inquiries
3. **Auto-responders**: Configure automatic responses
4. **Ticket System**: Integrate with helpdesk system

## 📊 Analytics & Monitoring

### Conversation Analytics
Track important metrics:
- **Message Volume**: Number of conversations per day
- **Response Times**: Average response time for AI and agents
- **User Satisfaction**: Feedback ratings and sentiment analysis
- **Popular Topics**: Most common user queries

### Performance Monitoring
- **API Response Times**: Monitor chatbot API performance
- **Error Rates**: Track failed requests and errors
- **Agent Availability**: Monitor agent online status
- **System Health**: Overall system performance metrics

### Implementation
```typescript
// Analytics tracking example
const trackEvent = (eventName: string, data: any) => {
  if (CHATBOT_CONFIG.analytics.enabled) {
    // Send to analytics service
    analytics.track(eventName, data);
  }
};
```

## 🔒 Security & Privacy

### Data Protection
- **PII Redaction**: Automatically redact personal information
- **Data Encryption**: Encrypt sensitive conversation data
- **Retention Policies**: Automatically delete old conversations
- **GDPR Compliance**: Ensure compliance with data protection regulations

### Security Measures
- **Input Validation**: Sanitize user inputs to prevent XSS
- **Rate Limiting**: Prevent abuse with rate limiting
- **Access Control**: Restrict access to admin features
- **Audit Logs**: Maintain logs of all system activities

## 🎨 Customization

### Branding
- **Colors**: Match school colors (GIS Green theme)
- **Logo**: Add school logo to chat interface
- **Typography**: Use school fonts for consistency
- **Voice**: Tailor conversation tone to school values

### Advanced Features
- **Multilingual Support**: Add multiple language options
- **File Sharing**: Allow users to share documents
- **Video Chat**: Integrate video calling capabilities
- **Appointment Booking**: Schedule school visits through chat

## 🚀 Deployment

### Production Setup
1. **Environment Variables**: Configure production environment
2. **Domain Setup**: Configure custom domain for API
3. **SSL Certificate**: Ensure HTTPS is enabled
4. **Monitoring**: Set up error tracking and performance monitoring

### Testing
- **Unit Tests**: Test individual components
- **Integration Tests**: Test API endpoints
- **E2E Tests**: Test complete user workflows
- **Load Testing**: Test performance under heavy load

## 📞 Support

### Troubleshooting
Common issues and solutions:

1. **Chatbot not loading**: Check JavaScript errors and network requests
2. **API not responding**: Verify API endpoint configuration
3. **Agents not available**: Check agent configuration and availability
4. **WhatsApp not working**: Verify WhatsApp Business API setup

### Maintenance
- **Regular Updates**: Keep dependencies up to date
- **Content Updates**: Review and update AI responses regularly
- **Performance Monitoring**: Monitor system performance and user feedback
- **Security Updates**: Apply security patches promptly

## 🔄 Future Enhancements

### Planned Features
- **Voice Chat**: Add voice input/output capabilities
- **AI Training**: Train custom AI model on school-specific data
- **Mobile App**: Create dedicated mobile app
- **Integration**: Connect with school management systems

### Technology Roadmap
- **Advanced AI**: Implement more sophisticated AI models
- **Machine Learning**: Add learning capabilities from conversations
- **Predictive Analytics**: Anticipate user needs
- **Omnichannel**: Seamless integration across all communication channels

---

## 📞 Contact

For technical support or questions about the chatbot system:

- **Email**: tech@adjis.edu.gh
- **Phone**: +233302000000 ext. 500
- **Documentation**: Available in the school's knowledge base

---

*This chatbot system is designed to enhance communication between ADJIS and prospective families, providing instant support and seamless connections to human agents when needed.*
