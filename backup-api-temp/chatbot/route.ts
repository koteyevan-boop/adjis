import { NextRequest, NextResponse } from 'next/server';

// AI Response logic
const generateAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Admissions related responses
  if (lowerMessage.includes('admission') || lowerMessage.includes('apply') || lowerMessage.includes('enroll')) {
    return "Great to hear you're interested in ADJIS! Our admissions process is straightforward. You can apply online through our website, and we offer programs from infant through upper secondary levels. Would you like me to connect you with an admissions counselor for detailed guidance?";
  }
  
  // Fee related responses
  if (lowerMessage.includes('fee') || lowerMessage.includes('cost') || lowerMessage.includes('tuition')) {
    return "Our tuition fees vary by program level. We offer competitive pricing with flexible payment options. For specific fee information, I'd recommend speaking with our finance office. Would you like me to connect you with them?";
  }
  
  // Program related responses
  if (lowerMessage.includes('program') || lowerMessage.includes('curriculum') || lowerMessage.includes('subject')) {
    return "ADJIS offers a comprehensive Cambridge International Curriculum from Early Years through Advanced Level. We also have Pearson BTEC pathways in Music and Creative Media. Our programs emphasize holistic development with strong academics, arts, and sports. Which program level are you interested in?";
  }
  
  // Contact/Visit related responses
  if (lowerMessage.includes('visit') || lowerMessage.includes('tour') || lowerMessage.includes('contact')) {
    return "We'd love to show you around ADJIS! We offer school tours on weekdays. You can schedule a visit by calling our office or filling out the inquiry form on our website. Would you like me to help you schedule a tour?";
  }
  
  // General responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! Welcome to ADJIS. How can I help you learn more about our school today?";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with regarding ADJIS?";
  }
  
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return "Thank you for chatting with ADJIS! Feel free to reach out anytime. Have a wonderful day!";
  }
  
  // Default response
  return "I understand you're asking about: " + userMessage + ". While I can provide general information, for specific details, I can connect you with one of our knowledgeable staff members. Would you like to speak with an admissions counselor, academic advisor, or general support?";
};

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    // Generate AI response
    const aiResponse = generateAIResponse(message);
    
    // In a real implementation, you could:
    // 1. Integrate with OpenAI API
    // 2. Use a custom trained model
    // 3. Connect to a dialogue management system
    // 4. Add context awareness using conversation history
    
    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      type: 'ai'
    });
    
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle agent connection requests
export async function PUT(request: NextRequest) {
  try {
    const { agentType, userMessage } = await request.json();
    
    // In a real implementation, this would:
    // 1. Check agent availability
    // 2. Create a connection to live chat system
    // 3. Notify the agent
    // 4. Return connection details
    
    const agents = {
      admissions: {
        name: 'Sarah Johnson',
        type: 'Admissions Counselor',
        availability: true,
        estimatedWait: 2 // minutes
      },
      academic: {
        name: 'Dr. Michael Chen',
        type: 'Academic Advisor',
        availability: true,
        estimatedWait: 5
      },
      support: {
        name: 'Alex Thompson',
        type: 'Support Specialist',
        availability: false,
        estimatedWait: 10
      }
    };
    
    const selectedAgent = agents[agentType as keyof typeof agents];
    
    if (!selectedAgent) {
      return NextResponse.json({ error: 'Agent type not found' }, { status: 404 });
    }
    
    if (!selectedAgent.availability) {
      return NextResponse.json({
        error: 'Agent not available',
        estimatedWait: selectedAgent.estimatedWait,
        message: `The ${selectedAgent.type} is currently busy. Estimated wait time: ${selectedAgent.estimatedWait} minutes. Would you like to wait or try another option?`
      }, { status: 503 });
    }
    
    // Simulate agent connection
    return NextResponse.json({
      success: true,
      agent: selectedAgent,
      connectionId: `conn_${Date.now()}`,
      message: `Connecting you to ${selectedAgent.name} (${selectedAgent.type})...`
    });
    
  } catch (error) {
    console.error('Agent connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to agent' },
      { status: 500 }
    );
  }
}
