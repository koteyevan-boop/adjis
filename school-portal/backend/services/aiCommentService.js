const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

class AICommentService {
  constructor() {
    // Initialize AI providers (you can use OpenAI, Google Gemini, or custom rules)
    this.openai = process.env.OPENAI_API_KEY 
      ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      : null;
    
    this.genAI = process.env.GOOGLE_AI_KEY
      ? new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY)
      : null;
  }

  async generateComments(subject, marks, total, studentInfo) {
    const percentage = (marks / total) * 100;
    
    // Try OpenAI first if available
    if (this.openai) {
      return await this.generateWithOpenAI(subject, percentage, studentInfo);
    }
    
    // Try Google Gemini if available
    if (this.genAI) {
      return await this.generateWithGemini(subject, percentage, studentInfo);
    }
    
    // Fallback to rule-based generation
    return this.generateWithRules(subject, percentage);
  }

  async generateWithOpenAI(subject, percentage, studentInfo) {
    try {
      const prompt = `Generate a constructive and encouraging comment for a student's performance in ${subject}. 
      They scored ${percentage.toFixed(1)}% in the exam.
      Student name: ${studentInfo.name}, Grade: ${studentInfo.grade}.
      The comment should be professional, specific to the subject, and provide suggestions for improvement if needed.
      Keep it to 2-3 sentences.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful teacher generating report card comments." },
          { role: "user", content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.7
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI error:', error);
      return this.generateWithRules(subject, percentage);
    }
  }

  async generateWithGemini(subject, percentage, studentInfo) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Generate a constructive comment for a student's performance in ${subject}. 
      Score: ${percentage.toFixed(1)}%. Student: ${studentInfo.name} (Grade ${studentInfo.grade}).
      Make it encouraging and specific. 2-3 sentences.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini error:', error);
      return this.generateWithRules(subject, percentage);
    }
  }

  generateWithRules(subject, percentage) {
    // Rule-based comment generation
    let comment = '';
    
    if (percentage >= 90) {
      comment = `Excellent performance in ${subject}! ${studentInfo.name} has demonstrated outstanding understanding of the concepts. Keep up the great work!`;
    } else if (percentage >= 75) {
      comment = `Good work in ${subject}. ${studentInfo.name} has shown solid understanding. With continued effort, can achieve even better results.`;
    } else if (percentage >= 60) {
      comment = `Satisfactory performance in ${subject}. ${studentInfo.name} needs to focus on practicing more problems to strengthen concepts.`;
    } else if (percentage >= 40) {
      comment = `Needs improvement in ${subject}. Regular practice and attention to fundamentals will help improve performance.`;
    } else {
      comment = `Requires significant improvement in ${subject}. Please focus on basic concepts and seek additional help when needed.`;
    }

    return comment;
  }

  async generateOverallComments(subjects, studentInfo) {
    const average = subjects.reduce((sum, s) => sum + s.percentage, 0) / subjects.length;
    
    if (this.openai) {
      try {
        const subjectList = subjects.map(s => `${s.name}: ${s.percentage.toFixed(1)}%`).join(', ');
        
        const prompt = `Generate an overall report card comment for a student.
        Student: ${studentInfo.name} (Grade ${studentInfo.grade})
        Subject-wise performance: ${subjectList}
        Overall average: ${average.toFixed(1)}%
        
        Provide a comprehensive comment about their overall performance, strengths, and areas for improvement.
        Include encouragement and specific suggestions. 3-4 sentences.`;

        const response = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a class teacher writing report card comments." },
            { role: "user", content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.7
        });

        return response.choices[0].message.content;
      } catch (error) {
        console.error('OpenAI error:', error);
      }
    }

    // Rule-based overall comment
    if (average >= 85) {
      return `${studentInfo.name} has had an outstanding academic year. Excellent performance across all subjects. Keep up the dedication!`;
    } else if (average >= 70) {
      return `${studentInfo.name} has performed well this term. Shows good understanding of concepts. Encourage continued effort in all subjects.`;
    } else if (average >= 50) {
      return `${studentInfo.name} has shown satisfactory progress. Needs to focus on consistent study habits and regular practice.`;
    } else {
      return `${studentInfo.name} needs significant improvement. Please ensure regular study time and seek help when needed.`;
    }
  }
}

module.exports = new AICommentService();