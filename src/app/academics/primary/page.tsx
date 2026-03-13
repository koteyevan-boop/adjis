'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Brain, Users, Clock, Award, Calculator, Globe, Palette, Music, Trophy, Target, Lightbulb } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function PrimarySchoolPage() {
  const [selectedClass, setSelectedClass] = useState('all');

  const classes = [
    {
      id: 'class1',
      title: 'Class 1',
      ageRange: '6-7 years',
      description: 'Building foundational skills in literacy, numeracy, and science through engaging, interactive lessons.',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Art & Music', 'Physical Education'],
      highlights: ['Reading program', 'Math foundations', 'Science exploration', 'Creative arts'],
      capacity: 30,
      enrolled: 28
    },
    {
      id: 'class2',
      title: 'Class 2',
      ageRange: '7-8 years',
      description: 'Expanding knowledge and skills with more complex concepts and independent learning opportunities.',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'Art & Music', 'Physical Education'],
      highlights: ['Advanced literacy', 'Problem-solving', 'Research skills', 'Technology integration'],
      capacity: 30,
      enrolled: 29
    },
    {
      id: 'class3',
      title: 'Class 3',
      ageRange: '8-9 years',
      description: 'Developing critical thinking and analytical skills through project-based learning and collaboration.',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'French', 'Art & Music', 'Physical Education'],
      highlights: ['Critical thinking', 'Project work', 'Language skills', 'STEM activities'],
      capacity: 30,
      enrolled: 27
    },
    {
      id: 'class4',
      title: 'Class 4',
      ageRange: '9-10 years',
      description: 'Preparing for upper primary with advanced academic challenges and leadership opportunities.',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'French', 'Art & Music', 'Physical Education'],
      highlights: ['Advanced academics', 'Leadership roles', 'Public speaking', 'Scientific method'],
      capacity: 30,
      enrolled: 30
    },
    {
      id: 'class5',
      title: 'Class 5',
      ageRange: '10-11 years',
      description: 'Consolidating primary education with comprehensive preparation for secondary school transition.',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'French', 'Art & Music', 'Physical Education'],
      highlights: ['Exam preparation', 'Study skills', 'Career awareness', 'Advanced projects'],
      capacity: 30,
      enrolled: 29
    },
    {
      id: 'class6',
      title: 'Class 6',
      ageRange: '11-12 years',
      description: 'Final year of primary education with focus on academic excellence and secondary school readiness.',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'French', 'Art & Music', 'Physical Education'],
      highlights: ['Primary exams prep', 'Leadership training', 'Secondary readiness', 'Career guidance'],
      capacity: 30,
      enrolled: 28
    }
  ];

  const curriculumFeatures = [
    {
      title: 'Cambridge Primary Curriculum',
      description: 'Internationally recognized curriculum that develops critical thinking and problem-solving skills.',
      icon: Globe,
      color: 'bg-blue-500'
    },
    {
      title: 'STEM Excellence',
      description: 'Strong focus on Science, Technology, Engineering, and Mathematics with hands-on learning.',
      icon: Calculator,
      color: 'bg-green-500'
    },
    {
      title: 'Language Development',
      description: 'Comprehensive language program including English, French, and local languages.',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      title: 'Arts & Creativity',
      description: 'Rich arts program including music, drama, visual arts, and creative expression.',
      icon: Palette,
      color: 'bg-orange-500'
    },
    {
      title: 'Sports & Physical Education',
      description: 'Comprehensive sports program promoting physical fitness and teamwork.',
      icon: Trophy,
      color: 'bg-red-500'
    },
    {
      title: 'Digital Learning',
      description: 'Integration of technology in learning with modern digital tools and resources.',
      icon: Brain,
      color: 'bg-indigo-500'
    }
  ];

  const coCurricularActivities = [
    {
      name: 'Sports Club',
      description: 'Football, basketball, swimming, athletics, and team sports.',
      icon: '⚽'
    },
    {
      name: 'Music & Drama',
      description: 'School choir, band, drama club, and musical performances.',
      icon: '🎭'
    },
    {
      name: 'Art Club',
      description: 'Painting, drawing, crafts, and creative expression activities.',
      icon: '🎨'
    },
    {
      name: 'Science Club',
      description: 'Hands-on experiments, science fairs, and innovation projects.',
      icon: '🔬'
    },
    {
      name: 'Debate Club',
      description: 'Public speaking, debates, and communication skills development.',
      icon: '🎤'
    },
    {
      name: 'Environmental Club',
      description: 'Nature conservation, gardening, and environmental awareness.',
      icon: '🌱'
    }
  ];

  const achievements = [
    {
      title: 'Cambridge Excellence',
      subtitle: 'Primary Checkpoint Results',
      value: '95%',
      description: 'Above international average in all subjects'
    },
    {
      title: 'Reading Proficiency',
      subtitle: 'Literacy Assessment',
      value: '98%',
      description: 'Students reading at or above grade level'
    },
    {
      title: 'Mathematics Success',
      subtitle: 'Problem-solving Skills',
      value: '92%',
      description: 'Students exceeding math benchmarks'
    },
    {
      title: 'Student Satisfaction',
      subtitle: 'Annual Survey',
      value: '96%',
      description: 'Students happy with their learning experience'
    }
  ];

  return (
    <PageLayout title="Primary School - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="ADJIS Primary School"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-4xl">
              <Link 
                href="/academics/departments" 
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Departments
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Primary School</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Building strong academic foundations with the Cambridge Primary Curriculum while nurturing creativity, critical thinking, and character development. Where learning meets excellence and every child's potential is nurtured.
              </p>
            </div>
          </div>
        </section>

        {/* Classes Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Classes</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Six years of comprehensive primary education from Class 1 to Class 6.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classInfo) => (
                <div key={classInfo.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                    <h3 className="text-xl font-bold mb-2">{classInfo.title}</h3>
                    <p className="text-white/90 mb-1">{classInfo.ageRange}</p>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Users className="w-4 h-4" />
                      <span>{classInfo.enrolled}/{classInfo.capacity} students</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 text-sm">{classInfo.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Subjects:</h4>
                      <div className="flex flex-wrap gap-1">
                        {classInfo.subjects.map((subject, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Key Focus Areas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {classInfo.highlights.map((highlight: string, index: number) => (
                              <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                {highlight}
                              </span>
                            ))
                        }
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Curriculum Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our Cambridge Primary Curriculum provides a comprehensive framework for learning and assessment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curriculumFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`${feature.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Co-curricular Activities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Co-curricular Activities</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Beyond academics, we offer diverse activities to develop well-rounded students.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coCurricularActivities.map((activity, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4 text-center">{activity.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{activity.name}</h3>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Achievements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Academic Achievements</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our students consistently achieve outstanding results in national and international assessments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{achievement.value}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{achievement.subtitle}</p>
                  <p className="text-xs text-gray-500">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Environment */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Learning Environment</h2>
                <p className="text-gray-600 mb-6">
                  Our primary school provides a stimulating, safe, and supportive environment where children can thrive academically and personally.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Individualized Attention</h3>
                      <p className="text-sm text-gray-600">Small class sizes ensure personalized learning and support for each student.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Innovative Teaching</h3>
                      <p className="text-sm text-gray-600">Modern teaching methods and technology integration enhance learning experiences.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Character Development</h3>
                      <p className="text-sm text-gray-600">Focus on values, leadership, and social responsibility alongside academics.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src="/images/hero.jpg"
                  alt="Primary School Learning Environment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Primary School</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Give your child the foundation for academic success and personal growth at ADJIS Primary School.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Link 
                href="/admissions/apply"
                className="flex-1 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link 
                href="/admissions"
                className="flex-1 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Schedule Tour
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
