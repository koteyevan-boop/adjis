'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Users, Trophy, Heart, Star, Camera, Music } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function NewsUpdatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsItems = [
    {
      id: 1,
      title: "ADJIS Celebrates Excellence in Cambridge Results",
      excerpt: "Our students have achieved outstanding results in the recent Cambridge International examinations, with several students earning top honors and distinctions across various subjects.",
      date: "March 15, 2026",
      category: "announcements",
      image: "/images/yh.png",
      author: "ADJIS Admin",
      featured: true
    },
    {
      id: 2,
      title: "Science Fair Winners Announced",
      excerpt: "Our students showcase innovative projects at the annual science fair, with winners advancing to regional competitions.",
      date: "March 10, 2026",
      category: "academics",
      image: "/images/hero.jpg",
      author: "Science Department"
    },
    {
      id: 3,
      title: "Sports Day 2026 - Record Breaking Performance",
      excerpt: "Students demonstrate exceptional athletic abilities and sportsmanship during this year's sports day events.",
      date: "March 5, 2026",
      category: "sports",
      image: "/images/hero.jpg",
      author: "PE Department"
    },
    {
      id: 4,
      title: "Cultural Festival Showcases Student Talent",
      excerpt: "A vibrant display of cultural diversity and artistic talent at our annual cultural festival.",
      date: "February 28, 2026",
      category: "events",
      image: "/images/hero.jpg",
      author: "Arts Department"
    },
    {
      id: 5,
      title: "New Cambridge Program Launch",
      excerpt: "ADJIS introduces enhanced Cambridge International Curriculum with advanced STEM focus.",
      date: "February 20, 2026",
      category: "academics",
      image: "/images/hero.jpg",
      author: "Academic Office"
    },
    {
      id: 6,
      title: "Community Service Initiative",
      excerpt: "Students participate in meaningful community service projects, making a positive impact in local communities.",
      date: "February 15, 2026",
      category: "community",
      image: "/images/hero.jpg",
      author: "Service Learning Coordinator"
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', icon: Star },
    { id: 'announcements', name: 'Announcements', icon: Heart },
    { id: 'academics', name: 'Academics', icon: Trophy },
    { id: 'sports', name: 'Sports', icon: Users },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'community', name: 'Community', icon: Music }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  return (
    <PageLayout title="News & Updates - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gis-green to-gis-green-dark text-white h-[500px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="News & Updates"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">News & Updates</h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-6">
                Stay informed about the latest happenings, achievements, and events at Adorable Babies & Josemaria International School. Where learning meets excellence and every child's potential is nurtured.
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

        {/* Category Filter */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-gis-green text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured News */}
        {featuredNews.length > 0 && selectedCategory === 'all' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured News</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredNews.map((news) => (
                  <article key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{news.date}</span>
                        <span>•</span>
                        <span>{news.author}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{news.title}</h3>
                      <p className="text-gray-600 mb-4">{news.excerpt}</p>
                      <Link 
                        href={`/news/${news.id}`}
                        className="inline-flex items-center text-gis-green hover:text-gis-green-dark font-medium transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular News Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {selectedCategory === 'all' ? 'Latest News' : `${categories.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularNews.map((news) => (
                <article key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{news.date}</span>
                      <span>•</span>
                      <span>{news.author}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{news.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                    <Link 
                      href={`/news/${news.id}`}
                      className="inline-flex items-center text-gis-green hover:text-gis-green-dark font-medium transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gis-green text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-gis-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
