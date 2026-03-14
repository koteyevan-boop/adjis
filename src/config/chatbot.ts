// Chatbot Configuration
export const CHATBOT_CONFIG = {
  // School Information
  school: {
    name: "Adorable Babies & Josemaria International School",
    abbreviation: "ADJIS",
    motto: "Nurturing Little Steps to Big Steps",
    founded: "2010",
    
    // Contact Information
    contact: {
      phone: "+233302000000", // Replace with actual phone
      whatsapp: "+233201234567", // Replace with actual WhatsApp
      email: "admissions@adjis.edu.gh",
      address: "Accra, Ghana"
    }
  },
  
  // Chatbot Settings
  chatbot: {
    name: "ADJIS Assistant",
    welcomeMessage: "Hello! Welcome to Adorable Babies & Josemaria International School (ADJIS). Established in 2010, we offer a blended curriculum combining GES, Montessori, and Cambridge systems. I'm here to help you with any questions about admissions, programs, or school information. How can I assist you today?",
    typingDelay: 1000, // milliseconds
    maxMessages: 50, // Maximum messages to keep in chat history
    
    // AI Settings
    ai: {
      provider: "custom", // Can be "openai", "custom", etc.
      model: "gpt-3.5-turbo", // For OpenAI integration
      maxTokens: 150,
      temperature: 0.7
    }
  },
  
  // Human Agent Configuration
  agents: {
    admissions: {
      name: "Sarah Johnson",
      type: "Admissions Counselor",
      department: "Admissions Office",
      workingHours: "8:00 AM - 4:00 PM GMT",
      specialties: ["Admissions Process", "Application Requirements", "School Tours", "Fee Information"]
    },
    
    academic: {
      name: "Dr. Michael Chen",
      type: "Academic Advisor", 
      department: "Academic Affairs",
      workingHours: "9:00 AM - 5:00 PM GMT",
      specialties: ["Curriculum", "Program Selection", "Academic Support", "Assessment"]
    },
    
    support: {
      name: "Alex Thompson",
      type: "Support Specialist",
      department: "Student Services",
      workingHours: "8:00 AM - 6:00 PM GMT",
      specialties: ["General Inquiries", "Technical Support", "Parent Portal", "Student Services"]
    }
  },
  
  // External Connections
  connections: {
    whatsapp: {
      enabled: true,
      phoneNumber: "+233201234567", // Replace with actual
      businessHours: "8:00 AM - 6:00 PM GMT",
      responseTime: "Within 2 hours"
    },
    
    phone: {
      enabled: true,
      phoneNumber: "+233302000000", // Replace with actual
      departments: {
        admissions: "ext. 101",
        academic: "ext. 102", 
        support: "ext. 103"
      }
    },
    
    email: {
      enabled: true,
      addresses: {
        admissions: "admissions@adjis.edu.gh",
        academic: "academic@adjis.edu.gh",
        support: "support@adjis.edu.gh",
        general: "info@adjis.edu.gh"
      },
      responseTime: "Within 24 hours"
    }
  },
  
  // AI Response Templates
  aiResponses: {
    greetings: [
      "Hello! Welcome to ADJIS. How can I help you learn more about our school today?",
      "Hi there! I'm here to answer your questions about Adorable Babies & Josemaria International School.",
      "Welcome! I'm your ADJIS assistant. What would you like to know about our school?"
    ],
    
    admissions: {
      general: "Great to hear you're interested in ADJIS! Our admissions process is straightforward. You can apply online through our website, and we offer programs from infant through upper secondary levels.",
      process: "Our admissions process includes: 1) Online application form, 2) Submission of required documents, 3) Assessment (if applicable), 4) Interview with admissions team, 5) Offer letter.",
      requirements: "Requirements vary by program level. Generally, you'll need: birth certificate, previous school records, immunization records, and passport photos for new students."
    },
    
    academics: {
      curriculum: "ADJIS offers Cambridge International Curriculum from Early Years through Advanced Level, plus Pearson BTEC pathways in Music and Creative Media.",
      programs: "We offer: Infant School (ages 3-5), Junior School (ages 6-11), Lower Secondary (ages 12-14), Upper Secondary (ages 15-18).",
      facilities: "Our campus includes: science laboratories, computer labs, library, sports facilities, music rooms, art studios, and modern classrooms."
    },
    
    contact: {
      visit: "We'd love to show you around ADJIS! School tours are available Monday-Friday, 9:00 AM - 3:00 PM. Please call ahead to schedule.",
      office: "Our admissions office is open Monday-Friday, 8:00 AM - 4:00 PM. You can visit us or call during these hours."
    },
    
    fallback: "I understand your question. While I can provide general information, for specific details, I can connect you with one of our knowledgeable staff members."
  },
  
  // Analytics and Tracking
  analytics: {
    enabled: true,
    trackEvents: ["message_sent", "agent_connected", "contact_requested"],
    retentionDays: 30 // How long to keep chat logs
  }
};

// Helper functions
export const getAgentByType = (type: string) => {
  return CHATBOT_CONFIG.agents[type as keyof typeof CHATBOT_CONFIG.agents];
};

export const getContactInfo = (method: string) => {
  return CHATBOT_CONFIG.connections[method as keyof typeof CHATBOT_CONFIG.connections];
};

export const formatWorkingHours = (hours: string) => {
  return hours;
};

export const isBusinessHours = () => {
  const now = new Date();
  const ghanaTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Accra"}));
  const hour = ghanaTime.getHours();
  const day = ghanaTime.getDay();
  
  // Monday-Friday, 8 AM - 6 PM
  return day >= 1 && day <= 5 && hour >= 8 && hour < 18;
};
