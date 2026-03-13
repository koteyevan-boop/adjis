'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Brain, Heart, Users, Clock, Award, BookOpen, Play, Music, Palette, Star } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function PreSchoolPage() {
  const [selectedProgram, setSelectedProgram] = useState('all');

  const programs = [
    {
      id: 'nursery',
      title: 'Nursery Class',
      ageRange: '3-4 years',
      description: 'A gentle introduction to school life with focus on social development, basic literacy, and numeracy through play.',
      schedule: 'Monday - Friday, 8:00 AM - 12:00 PM',
      capacity: 20,
      enrolled: 18,
      highlights: ['Play-based learning', 'Social skills development', 'Basic literacy & numeracy'],
      activities: ['Story time', 'Music & movement', 'Art & craft', 'Outdoor play']
    },
    {
      id: 'kindergarten1',
      title: 'Kindergarten 1',
      ageRange: '4-5 years',
      description: 'Building foundational skills through structured play and guided learning activities.',
      schedule: 'Monday - Friday, 8:00 AM - 1:00 PM',
      capacity: 25,
      enrolled: 22,
      highlights: ['Early literacy skills', 'Number recognition', 'Creative expression'],
      activities: ['Phonics program', 'Math games', 'Science exploration', 'Drama & role play']
    },
    {
      id: 'kindergarten2',
      title: 'Kindergarten 2',
      ageRange: '5-6 years',
      description: 'Preparing children for primary school with comprehensive early years education.',
      schedule: 'Monday - Friday, 8:00 AM - 2:00 PM',
      capacity: 25,
      enrolled: 24,
      highlights: ['Reading readiness', 'Mathematical concepts', 'Independent learning'],
      activities: ['Reading program', 'Writing practice', 'Problem-solving activities', 'Group projects']
    }
  ];

  const learningAreas = [
    {
      title: 'Literacy & Language',
      description: 'Developing communication skills through stories, songs, and interactive activities.',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Mathematics',
      description: 'Building number sense and mathematical thinking through hands-on activities.',
      icon: Brain,
      color: 'bg-green-500'
    },
    {
      title: 'Creative Arts',
      description: 'Nurturing creativity through art, music, drama, and movement.',
      icon: Palette,
      color: 'bg-purple-500'
    },
    {
      title: 'Social & Emotional',
      description: 'Developing social skills, emotional intelligence, and positive relationships.',
      icon: Heart,
      color: 'bg-pink-500'
    },
    {
      title: 'Physical Development',
      description: 'Enhancing gross and fine motor skills through structured play and activities.',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      title: 'Knowledge & Understanding',
      description: 'Exploring the world around us through science, nature, and cultural activities.',
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  const facilities = [
    {
      name: 'Bright, Spacious Classrooms',
      description: 'Well-lit, air-conditioned rooms with age-appropriate furniture and learning materials.',
      icon: '🏫'
    },
    {
      name: 'Indoor Play Area',
      description: 'Safe, stimulating space for physical activities and imaginative play.',
      icon: '🎪'
    },
    {
      name: 'Outdoor Playground',
      description: 'Secure outdoor area with age-appropriate playground equipment and garden.',
      icon: '🎠'
    },
    {
      name: 'Library Corner',
      description: 'Cozy reading area with age-appropriate books and storytelling materials.',
      icon: '📚'
    },
    {
      name: 'Art & Music Room',
      description: 'Dedicated space for creative activities with art supplies and musical instruments.',
      icon: '🎨'
    },
    {
      name: 'Nap Room',
      description: 'Quiet, comfortable space for rest and relaxation during the school day.',
      icon: '😴'
    }
  ];

  const weeklySchedule = [
    {
      day: 'Monday',
      activities: [
        { time: '8:00 - 8:30 AM', activity: 'Arrival & Free Play' },
        { time: '8:30 - 9:00 AM', activity: 'Circle Time & Morning Meeting' },
        { time: '9:00 - 9:45 AM', activity: 'Literacy & Language' },
        { time: '9:45 - 10:15 AM', activity: 'Snack Time' },
        { time: '10:15 - 11:00 AM', activity: 'Mathematics & Numbers' },
        { time: '11:00 - 11:45 AM', activity: 'Outdoor Play' },
        { time: '11:45 AM - 12:30 PM', activity: 'Lunch Time' },
        { time: '12:30 - 1:15 PM', activity: 'Creative Arts & Music' },
        { time: '1:15 - 2:00 PM', activity: 'Science & Discovery' },
        { time: '2:00 - 2:30 PM', activity: 'Story Time & Review' },
        { time: '2:30 - 3:00 PM', activity: 'Preparation for Home' }
      ]
    },
    {
      day: 'Tuesday',
      activities: [
        { time: '8:00 - 8:30 AM', activity: 'Arrival & Morning Games' },
        { time: '8:30 - 9:00 AM', activity: 'Circle Time & Songs' },
        { time: '9:00 - 9:45 AM', activity: 'Phonics & Reading' },
        { time: '9:45 - 10:15 AM', activity: 'Fruit Break' },
        { time: '10:15 - 11:00 AM', activity: 'Counting & Shapes' },
        { time: '11:00 - 11:45 AM', activity: 'Playground Activities' },
        { time: '11:45 AM - 12:30 PM', activity: 'Lunch Time' },
        { time: '12:30 - 1:15 PM', activity: 'Painting & Crafts' },
        { time: '1:15 - 2:00 PM', activity: 'Nature Exploration' },
        { time: '2:00 - 2:30 PM', activity: 'Story Time & Review' },
        { time: '2:30 - 3:00 PM', activity: 'Preparation for Home' }
      ]
    },
    {
      day: 'Wednesday',
      activities: [
        { time: '8:00 - 8:30 AM', activity: 'Arrival & Free Play' },
        { time: '8:30 - 9:00 AM', activity: 'Morning Meeting & Calendar' },
        { time: '9:00 - 9:45 AM', activity: 'Writing Practice' },
        { time: '9:45 - 10:15 AM', activity: 'Snack Time' },
        { time: '10:15 - 11:00 AM', activity: 'Number Games' },
        { time: '11:00 - 11:45 AM', activity: 'Sports & Movement' },
        { time: '11:45 AM - 12:30 PM', activity: 'Lunch Time' },
        { time: '12:30 - 1:15 PM', activity: 'Music & Rhythm' },
        { time: '1:15 - 2:00 PM', activity: 'Water Play & Sensory' },
        { time: '2:00 - 2:30 PM', activity: 'Story Time & Review' },
        { time: '2:30 - 3:00 PM', activity: 'Preparation for Home' }
      ]
    },
    {
      day: 'Thursday',
      activities: [
        { time: '8:00 - 8:30 AM', activity: 'Arrival & Morning Activities' },
        { time: '8:30 - 9:00 AM', activity: 'Circle Time & Sharing' },
        { time: '9:00 - 9:45 AM', activity: 'Reading & Comprehension' },
        { time: '9:45 - 10:15 AM', activity: 'Healthy Snack' },
        { time: '10:15 - 11:00 AM', activity: 'Measurement & Patterns' },
        { time: '11:00 - 11:45 AM', activity: 'Garden Time' },
        { time: '11:45 AM - 12:30 PM', activity: 'Lunch Time' },
        { time: '12:30 - 1:15 PM', activity: 'Drama & Role Play' },
        { time: '1:15 - 2:00 PM', activity: 'Simple Experiments' },
        { time: '2:00 - 2:30 PM', activity: 'Story Time & Review' },
        { time: '2:30 - 3:00 PM', activity: 'Preparation for Home' }
      ]
    },
    {
      day: 'Friday',
      activities: [
        { time: '8:00 - 8:30 AM', activity: 'Arrival & Free Play' },
        { time: '8:30 - 9:00 AM', activity: 'Circle Time & Show & Tell' },
        { time: '9:00 - 9:45 AM', activity: 'Literacy Games' },
        { time: '9:45 - 10:15 AM', activity: 'Snack Time' },
        { time: '10:15 - 11:00 AM', activity: 'Math Fun Activities' },
        { time: '11:00 - 11:45 AM', activity: 'Outdoor Exploration' },
        { time: '11:45 AM - 12:30 PM', activity: 'Lunch Time' },
        { time: '12:30 - 1:15 PM', activity: 'Art & Creativity' },
        { time: '1:15 - 2:00 PM', activity: 'Fun Science Friday' },
        { time: '2:00 - 2:30 PM', activity: 'Story Time & Review' },
        { time: '2:30 - 3:00 PM', activity: 'Preparation for Home' }
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent of Nursery Student',
      content: 'The Pre-School program at ADJIS has been wonderful for my child. The teachers are nurturing and the play-based approach has helped my child develop confidence and social skills.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Parent of KG2 Student',
      content: 'My daughter has thrived in the Kindergarten program. She\'s now reading simple words and loves coming to school every day. The preparation for primary school is excellent.',
      rating: 5
    },
    {
      name: 'Emily Brown',
      role: 'Parent of KG1 Student',
      content: 'The balance between structured learning and play is perfect. My son has developed both academically and socially. The facilities are outstanding.',
      rating: 5
    }
  ];

  return (
    <PageLayout title="Pre-School - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white h-[500px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="ADJIS Pre-School"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Pre-School</h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-6">
                Where learning begins with joy and curiosity. Our Pre-School program provides a nurturing environment for children aged 3-6 to develop foundational skills through play-based learning. Where learning meets excellence and every child's potential is nurtured.
              </p>
              <Link 
                href="/academics/departments" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Departments
              </Link>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Programs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Age-appropriate programs designed to meet the developmental needs of young learners.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6">
                    <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                    <p className="text-white/90 mb-2">{program.ageRange}</p>
                    <p className="text-sm text-white/80">{program.schedule}</p>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Key Highlights:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {program.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Activities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.activities.map((activity, index) => (
                          <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{program.enrolled}</span> / {program.capacity} enrolled
                      </div>
                      <button className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Learning Areas</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our comprehensive curriculum covers all essential areas of early childhood development.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`${area.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{area.title}</h3>
                    <p className="text-gray-600 text-sm">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Weekly Schedule</h2>
                <p className="text-lg text-gray-600">
                  A comprehensive weekly routine with varied activities for each day to promote holistic development.
                </p>
              </div>
              
              {/* Schedule Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* Header Row - Times */}
                    <thead>
                      <tr className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                        <th className="p-4 text-left font-semibold">Day</th>
                        {weeklySchedule[0].activities.map((activity, index) => (
                          <th key={index} className="p-4 text-center font-semibold min-w-[120px]">
                            <div className="text-sm">{activity.time}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    
                    {/* Body Rows - Days and Activities */}
                    <tbody>
                      {weeklySchedule.map((daySchedule, dayIndex) => (
                        <tr key={dayIndex} className={dayIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="p-4 font-semibold text-gray-800 border-r-2 border-purple-200">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${
                                daySchedule.day === 'Monday' ? 'bg-blue-500' :
                                daySchedule.day === 'Tuesday' ? 'bg-green-500' :
                                daySchedule.day === 'Wednesday' ? 'bg-yellow-500' :
                                daySchedule.day === 'Thursday' ? 'bg-orange-500' :
                                'bg-red-500'
                              }`}></div>
                              {daySchedule.day}
                            </div>
                          </td>
                          {daySchedule.activities.map((activity, activityIndex) => (
                            <td key={activityIndex} className="p-3 text-center border-r border-gray-200 align-top">
                              <div className="bg-purple-50 text-purple-700 p-2 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors">
                                {activity.activity}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Monday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Tuesday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-600">Wednesday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-gray-600">Thursday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Friday</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Facilities</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Safe, stimulating, and age-appropriate facilities designed for young learners.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-4 text-center">{facility.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{facility.name}</h3>
                  <p className="text-gray-600 text-sm">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Parents Say</h2>
              <p className="text-lg text-gray-600">
                Hear from parents whose children are thriving in our Pre-School program.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-pink-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Begin Your Child's Learning Journey</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Give your child the best start in life with our nurturing Pre-School program.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Link 
                href="/admissions/apply"
                className="flex-1 bg-white text-pink-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link 
                href="/admissions"
                className="flex-1 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-500 transition-colors"
              >
                Schedule Visit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
