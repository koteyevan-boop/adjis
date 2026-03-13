'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Brain, Calculator, Globe, Palette, Music, Trophy, Users, Target, Award, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function CurriculumPage() {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const curriculumLevels = [
    {
      id: 'early-years',
      title: 'Early Years Foundation Stage',
      ageRange: '3-5 years',
      description: 'Play-based learning focusing on social, emotional, and cognitive development.',
      keyAreas: ['Communication & Language', 'Physical Development', 'Personal, Social & Emotional Development', 'Literacy', 'Mathematics', 'Understanding the World', 'Expressive Arts & Design'],
      assessment: 'Ongoing observational assessment and developmental milestones',
      icon: Brain
    },
    {
      id: 'primary',
      title: 'Cambridge Primary',
      ageRange: '5-11 years',
      description: 'Comprehensive curriculum developing knowledge, skills, and understanding in core subjects.',
      keyAreas: ['English', 'Mathematics', 'Science', 'Global Perspectives', 'Art & Design', 'Digital Literacy', 'Music', 'Physical Education'],
      assessment: 'Cambridge Primary Checkpoint and ongoing formative assessment',
      icon: BookOpen
    },
    {
      id: 'lower-secondary',
      title: 'Cambridge Lower Secondary',
      ageRange: '11-14 years',
      description: 'Broad and balanced curriculum preparing students for IGCSE and beyond.',
      keyAreas: ['English', 'Mathematics', 'Science', 'Global Perspectives', 'Art & Design', 'Digital Literacy', 'Music', 'Physical Education'],
      assessment: 'Cambridge Lower Secondary Checkpoint and continuous assessment',
      icon: Target
    },
    {
      id: 'upper-secondary',
      title: 'Cambridge Upper Secondary',
      ageRange: '14-16 years',
      description: 'Rigorous academic program leading to IGCSE qualifications.',
      keyAreas: ['English Language', 'Mathematics', 'Coordinated Sciences', 'Global Perspectives', 'Art & Design', 'Business Studies', 'Economics', 'Computer Science'],
      assessment: 'Cambridge IGCSE examinations and internal assessments',
      icon: Award
    },
    {
      id: 'advanced',
      title: 'Cambridge Advanced',
      ageRange: '16-19 years',
      description: 'Specialized study preparing students for university and professional pathways.',
      keyAreas: ['AS & A Level Subjects', 'BTEC qualifications', 'Extended Project Qualification', 'University Preparation', 'Career Guidance'],
      assessment: 'Cambridge International AS & A Level examinations and BTEC assessments',
      icon: Trophy
    }
  ];

  const subjectAreas = [
    {
      category: 'Languages',
      subjects: ['English Language', 'English Literature', 'French', 'Local Languages'],
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      category: 'Mathematics',
      subjects: ['Mathematics', 'Additional Mathematics', 'Statistics'],
      icon: Calculator,
      color: 'bg-green-500'
    },
    {
      category: 'Sciences',
      subjects: ['Biology', 'Chemistry', 'Physics', 'Coordinated Sciences'],
      icon: Brain,
      color: 'bg-purple-500'
    },
    {
      category: 'Humanities',
      subjects: ['History', 'Geography', 'Global Perspectives', 'Economics', 'Business Studies'],
      icon: Globe,
      color: 'bg-orange-500'
    },
    {
      category: 'Arts',
      subjects: ['Art & Design', 'Music', 'Drama', 'Design & Technology'],
      icon: Palette,
      color: 'bg-pink-500'
    },
    {
      category: 'Physical Education',
      subjects: ['Physical Education', 'Sports Science', 'Health & Fitness'],
      icon: Trophy,
      color: 'bg-red-500'
    }
  ];

  const teachingApproaches = [
    {
      title: 'Student-Centered Learning',
      description: 'Focus on individual student needs, interests, and learning styles.',
      features: ['Personalized learning plans', 'Differentiated instruction', 'Flexible grouping', 'Individualized support']
    },
    {
      title: 'Inquiry-Based Learning',
      description: 'Encouraging curiosity and critical thinking through questioning and exploration.',
      features: ['Problem-based learning', 'Research projects', 'Scientific investigations', 'Critical thinking exercises']
    },
    {
      title: 'Technology Integration',
      description: 'Using digital tools to enhance learning and prepare students for the digital age.',
      features: ['Interactive whiteboards', 'Educational software', 'Online learning platforms', 'Digital citizenship']
    },
    {
      title: 'Collaborative Learning',
      description: 'Promoting teamwork and communication through group activities and projects.',
      features: ['Group projects', 'Peer learning', 'Team presentations', 'Collaborative problem-solving']
    }
  ];

  const assessmentMethods = [
    {
      type: 'Formative Assessment',
      description: 'Ongoing assessment to monitor progress and provide feedback.',
      examples: ['Class participation', 'Quizzes', 'Homework assignments', 'Class observations', 'Peer assessment']
    },
    {
      type: 'Summative Assessment',
      description: 'End-of-unit or end-of-year assessments to measure achievement.',
      examples: ['Unit tests', 'Final examinations', 'Projects', 'Presentations', 'Practical assessments']
    },
    {
      type: 'External Assessment',
      description: 'Cambridge International examinations and assessments.',
      examples: ['Cambridge Checkpoint', 'IGCSE Examinations', 'AS & A Level Examinations', 'BTEC Assessments']
    },
    {
      type: 'Performance Assessment',
      description: 'Assessment of skills through practical applications and performances.',
      examples: ['Science experiments', 'Art portfolios', 'Music performances', 'Sports competitions', 'Drama productions']
    }
  ];

  const curriculumBenefits = [
    {
      title: 'International Recognition',
      description: 'Cambridge qualifications are recognized by universities and employers worldwide.',
      icon: Globe
    },
    {
      title: 'Holistic Development',
      description: 'Focus on academic excellence, character development, and life skills.',
      icon: Users
    },
    {
      title: 'Future Readiness',
      description: 'Preparation for university, careers, and lifelong learning.',
      icon: Target
    },
    {
      title: 'Flexibility & Choice',
      description: 'Wide range of subjects and pathways to suit different interests and goals.',
      icon: Award
    }
  ];

  return (
    <PageLayout title="Curriculum - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="ADJIS Curriculum"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-4xl">
              <Link 
                href="/academics" 
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Academics
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cambridge International Curriculum</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                A comprehensive, internationally recognized curriculum that develops knowledge, skills, and understanding for success in a global world. Where learning meets excellence and every child's potential is nurtured.
              </p>
            </div>
          </div>
        </section>

        {/* Curriculum Levels */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Curriculum Levels</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Progressive learning pathway from early years to advanced level.
              </p>
            </div>
            
            <div className="space-y-8">
              {curriculumLevels.map((level, index) => {
                const Icon = level.icon;
                return (
                  <div key={level.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{level.title}</h3>
                          <p className="text-white/90">{level.ageRange}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{level.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Key Learning Areas:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {level.keyAreas.map((area, areaIndex) => (
                            <div key={areaIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-700">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-4 h-4" />
                        <span><strong>Assessment:</strong> {level.assessment}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Subject Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Subject Areas</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive subject offerings across different disciplines.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                    <div className={`${area.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{area.category}</h3>
                    <ul className="space-y-1">
                      {area.subjects.map((subject, subjectIndex) => (
                        <li key={subjectIndex} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Teaching Approaches */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Teaching Approaches</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Innovative teaching methods that engage students and enhance learning.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {teachingApproaches.map((approach, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{approach.title}</h3>
                  <p className="text-gray-600 mb-4">{approach.description}</p>
                  <ul className="space-y-2">
                    {approach.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment Methods */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment Methods</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive assessment approach to measure student progress and achievement.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {assessmentMethods.map((method, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{method.type}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {method.examples.map((example, exampleIndex) => (
                        <span key={exampleIndex} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Curriculum Benefits</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Why choose Cambridge International Curriculum at ADJIS.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {curriculumBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
                    <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Learn More About Our Curriculum</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover how our Cambridge International Curriculum can benefit your child's education.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Link 
                href="/admissions/apply"
                className="flex-1 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link 
                href="/admissions"
                className="flex-1 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
