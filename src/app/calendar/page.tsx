'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Filter, Download, Bell } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const events = [
    {
      id: 1,
      title: "70th Anniversary Celebration",
      date: new Date(2026, 2, 25), // March 25, 2026
      endDate: new Date(2026, 2, 25),
      time: "9:00 AM - 4:00 PM",
      location: "School Auditorium",
      category: "events",
      description: "Grand celebration marking 70 years of ADJIS excellence",
      attendees: 500,
      featured: true
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: new Date(2026, 2, 28), // March 28, 2026
      endDate: new Date(2026, 2, 28),
      time: "2:00 PM - 5:00 PM",
      location: "Classrooms",
      category: "academic",
      description: "Discuss student progress and academic performance",
      attendees: 200
    },
    {
      id: 3,
      title: "Sports Day",
      date: new Date(2026, 3, 5), // April 5, 2026
      endDate: new Date(2026, 3, 5),
      time: "8:00 AM - 6:00 PM",
      location: "Sports Ground",
      category: "sports",
      description: "Annual sports competition and athletic events",
      attendees: 300
    },
    {
      id: 4,
      title: "Science Exhibition",
      date: new Date(2026, 3, 12), // April 12, 2026
      endDate: new Date(2026, 3, 13),
      time: "10:00 AM - 4:00 PM",
      location: "School Hall",
      category: "academic",
      description: "Student science projects and innovations showcase",
      attendees: 150
    },
    {
      id: 5,
      title: "Spring Concert",
      date: new Date(2026, 3, 18), // April 18, 2026
      endDate: new Date(2026, 3, 18),
      time: "6:00 PM - 8:00 PM",
      location: "Auditorium",
      category: "arts",
      description: "Musical performances by school choir and band",
      attendees: 250
    },
    {
      id: 6,
      title: "Mid-Term Exams",
      date: new Date(2026, 3, 22), // April 22, 2026
      endDate: new Date(2026, 3, 26),
      time: "8:00 AM - 12:00 PM",
      location: "Examination Halls",
      category: "academic",
      description: "Mid-term examination period",
      attendees: 400
    },
    {
      id: 7,
      title: "Community Service Day",
      date: new Date(2026, 4, 3), // May 3, 2026
      endDate: new Date(2026, 4, 3),
      time: "9:00 AM - 1:00 PM",
      location: "Various Locations",
      category: "service",
      description: "Students engage in community service projects",
      attendees: 350
    },
    {
      id: 8,
      title: "Cultural Festival",
      date: new Date(2026, 4, 15), // May 15, 2026
      endDate: new Date(2026, 4, 16),
      time: "10:00 AM - 6:00 PM",
      location: "School Grounds",
      category: "cultural",
      description: "Celebration of diverse cultures and traditions",
      attendees: 600
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', color: 'bg-gray-500' },
    { id: 'academic', name: 'Academic', color: 'bg-blue-500' },
    { id: 'sports', name: 'Sports', color: 'bg-green-500' },
    { id: 'arts', name: 'Arts', color: 'bg-purple-500' },
    { id: 'events', name: 'Events', color: 'bg-red-500' },
    { id: 'service', name: 'Service', color: 'bg-orange-500' },
    { id: 'cultural', name: 'Cultural', color: 'bg-pink-500' }
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getFilteredEvents = () => {
    if (selectedFilter === 'all') return events;
    return events.filter(event => event.category === selectedFilter);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));
    const firstDay = getFirstDayOfMonth(new Date(selectedYear, selectedMonth));
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div key={day} className={`h-24 border border-gray-200 p-2 overflow-hidden ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`text-xs p-1 rounded truncate text-white ${categories.find(c => c.id === event.category)?.color || 'bg-gray-500'}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = getFilteredEvents()
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <PageLayout title="Calendar - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-[500px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="School Calendar"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">School Calendar</h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-6">
                Stay updated with important dates, events, and activities at Adorable Babies & Josemaria International School. Where learning meets excellence and every child's potential is nurtured.
              </p>
              <Link 
                href="/life" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Life In ADJIS
              </Link>
            </div>
          </div>
        </section>

        {/* Calendar Controls */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Month Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {monthNames[selectedMonth]} {selectedYear}
                </h2>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* View Mode */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  List
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                      selectedFilter === category.id
                        ? `${category.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Calendar View */}
        {viewMode === 'month' && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Days of Week */}
                <div className="grid grid-cols-7 bg-gray-50 border-b">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-3 text-center text-sm font-semibold text-gray-700">
                      {day}
                    </div>
                  ))}
                </div>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7">
                  {renderCalendar()}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-2 ${
                          categories.find(c => c.id === event.category)?.color || 'bg-gray-500'
                        }`}>
                          {categories.find(c => c.id === event.category)?.name || 'Event'}
                        </span>
                        {event.featured && (
                          <span className="inline-block ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attendees expected</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Important Academic Dates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 mb-4">Term 1</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Sept 5: First Day of School</li>
                  <li>• Oct 15-20: Mid-term Break</li>
                  <li>• Dec 15: Last Day of Term</li>
                  <li>• Dec 16-Jan 8: Holiday Break</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-green-800 mb-4">Term 2</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Jan 9: First Day of Term</li>
                  <li>• Feb 20-24: Mid-term Break</li>
                  <li>• Apr 5-7: Easter Break</li>
                  <li>• Apr 28: Last Day of Term</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-purple-800 mb-4">Term 3</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• May 2: First Day of Term</li>
                  <li>• Jun 12-16: Mid-term Break</li>
                  <li>• Jul 24-28: Final Exams</li>
                  <li>• Jul 29: Last Day of School</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="font-bold text-orange-800 mb-4">Summer School</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Aug 1-25: Summer Program</li>
                  <li>• Aug 15-19: Sports Camp</li>
                  <li>• Aug 20-22: Art Workshop</li>
                  <li>• Aug 26: School Opens</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our calendar updates and never miss an important event or deadline.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <button className="flex-1 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <Bell className="w-4 h-4 mr-2 inline" />
                Subscribe to Updates
              </button>
              <button className="flex-1 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                <Download className="w-4 h-4 mr-2 inline" />
                Download Calendar
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
