'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Heart, Download, Share2, Filter, Grid, List, Camera, Users, Trophy, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function MemoriesPage() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const memories = [
    {
      id: 1,
      title: "15th Anniversary Celebration",
      year: "2025",
      category: "events",
      description: "A grand celebration marking one half decade of educational excellence at ADJIS.",
      image: "/images/yh.png",
      date: "March 2025",
      gallery: [
        "/images/anniversary1.jpg",
        "/images/anniversary2.jpg",
        "/images/anniversary3.jpg"
      ],
      featured: true
    },
    {
      id: 2,
      title: "Graduation Ceremony 2025",
      year: "2025",
      category: "academics",
      description: "Celebrating the achievements of our graduating class as they embark on new journeys.",
      image: "/images/graduation.jpg",
      date: "July 2025",
      gallery: [
        "/images/grad1.jpg",
        "/images/grad2.jpg",
        "/images/grad3.jpg"
      ]
    },
    {
      id: 3,
      title: "Sports Championship Victory",
      year: "2025",
      category: "sports",
      description: "Our students bring home the championship trophy after an incredible season.",
      image: "/images/championship.jpg",
      date: "May 2025",
      gallery: [
        "/images/sport1.jpg",
        "/images/sport2.jpg",
        "/images/sport3.jpg"
      ]
    },
    {
      id: 4,
      title: "Cultural Festival 2024",
      year: "2024",
      category: "cultural",
      description: "A vibrant showcase of our diverse cultural heritage and student talents.",
      image: "/images/cultural.jpg",
      date: "December 2024",
      gallery: [
        "/images/cult1.jpg",
        "/images/cult2.jpg",
        "/images/cult3.jpg"
      ]
    },
    {
      id: 5,
      title: "Science Exhibition",
      year: "2024",
      category: "academics",
      description: "Innovative projects and discoveries from our young scientists.",
      image: "/images/science-expo.jpg",
      date: "October 2024",
      gallery: [
        "/images/sci1.jpg",
        "/images/sci2.jpg",
        "/images/sci3.jpg"
      ]
    },
    {
      id: 6,
      title: "Community Service Week",
      year: "2024",
      category: "community",
      description: "Students making a difference through meaningful community service projects.",
      image: "/images/service.jpg",
      date: "September 2024",
      gallery: [
        "/images/serv1.jpg",
        "/images/serv2.jpg",
        "/images/serv3.jpg"
      ]
    }
  ];

  const years = ['all', '2026', '2025', '2024', '2023', '2022'];
  const categories = [
    { id: 'all', name: 'All Memories', icon: Heart },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'academics', name: 'Academics', icon: Trophy },
    { id: 'sports', name: 'Sports', icon: Users },
    { id: 'cultural', name: 'Cultural', icon: Camera },
    { id: 'community', name: 'Community', icon: Heart }
  ];

  const filteredMemories = memories.filter(memory => {
    const yearMatch = selectedYear === 'all' || memory.year === selectedYear;
    const categoryMatch = selectedCategory === 'all' || memory.category === selectedCategory;
    return yearMatch && categoryMatch;
  });

  const openGallery = (gallery: string[], index: number = 0) => {
    setCurrentGallery(gallery);
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setCurrentGallery([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  return (
    <PageLayout title="ADJIS - Memories" hideHero>
      <div className="min-h-screen bg-gray-50">
        <section className="relative h-96 md:h-[520px]">
          <Image
            src="/images/hero.jpg"
            alt="ADJIS - Memories"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-lime-400/75 to-green-500/75" />
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">ADJIS - Memories</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
                Relive the precious moments and achievements that make our school community special. Where learning meets excellence and every child's potential is nurtured.
              </p>
              <Link
                href="/life"
                className="inline-flex items-center text-white/90 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Life In ADJIS
              </Link>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Year Filter - Buttons + Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">All Years</label>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Quick Year Buttons */}
                  {['all', '2025', '2024', '2023'].map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        selectedYear === year
                          ? 'bg-lime-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {year === 'all' ? 'All Years' : year}
                    </button>
                  ))}
                  {/* Additional Years Dropdown */}
                  <div className="relative">
                    <select
                      value={['all', '2025', '2024', '2023'].includes(selectedYear) ? '' : selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value || 'all')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700 text-sm appearance-none cursor-pointer"
                    >
                      <option value="">More...</option>
                      {years.filter(year => !['all', '2025', '2024', '2023'].includes(year)).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Filter - Buttons + Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">All Memories</label>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Quick Category Buttons */}
                  {['all', 'events', 'academics', 'sports'].map((categoryId) => {
                    const category = categories.find((c) => c.id === categoryId);
                    const label = category?.name ?? 'All Memories';
                    return (
                      <button
                        key={categoryId}
                        onClick={() => setSelectedCategory(categoryId)}
                        className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                          selectedCategory === categoryId
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}

                  {/* Additional Categories Dropdown */}
                  <div className="relative">
                    <select
                      value={['all', 'events', 'academics', 'sports'].includes(selectedCategory) ? '' : selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value || 'all')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700 text-sm appearance-none cursor-pointer pr-7"
                    >
                      <option value="">More...</option>
                      {categories
                        .filter((c) => !['all', 'events', 'academics', 'sports'].includes(c.id))
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Memory */}
        {filteredMemories.filter(m => m.featured).length > 0 && selectedYear === 'all' && selectedCategory === 'all' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Memory</h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src="/images/hero.jpg"
                    alt="Featured Memory"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      Featured
                    </span>
                    <h3 className="text-3xl font-bold mb-2">
                      {filteredMemories.find(m => m.featured)?.title}
                    </h3>
                    <p className="text-lg text-white/90 mb-4">
                      {filteredMemories.find(m => m.featured)?.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => openGallery(filteredMemories.find(m => m.featured)?.gallery || [])}
                        className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-lg"
                      >
                        <Camera className="w-5 h-5 mr-2 inline" />
                        View Gallery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Memories Grid/List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {filteredMemories.length} {filteredMemories.length === 1 ? 'Memory' : 'Memories'} Found
            </h2>
            
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMemories.map((memory) => (
                  <div key={memory.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105">
                    <div className="relative h-48">
                      <Image
                        src={memory.image}
                        alt={memory.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {memory.year}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{memory.date}</span>
                        <span>•</span>
                        <span className="capitalize">{memory.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">{memory.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{memory.description}</p>
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => openGallery(memory.gallery)}
                          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md"
                        >
                          <Camera className="w-4 h-4 mr-2 inline" />
                          View Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredMemories.map((memory) => (
                  <div key={memory.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative h-48 md:h-auto">
                        <Image
                          src={memory.image}
                          alt={memory.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span>{memory.date}</span>
                          <span>•</span>
                          <span className="capitalize">{memory.category}</span>
                          <span>•</span>
                          <span>{memory.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{memory.title}</h3>
                        <p className="text-gray-600 mb-4">{memory.description}</p>
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => openGallery(memory.gallery)}
                            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md"
                          >
                            <Camera className="w-4 h-4 mr-2 inline" />
                            View Gallery ({memory.gallery.length} photos)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Share Your ADJIS Memories</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Have photos or stories from your time at ADJIS? We'd love to add them to our collection!
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <button className="flex-1 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <Camera className="w-4 h-4 mr-2 inline" />
                Upload Photos
              </button>
              <button className="flex-1 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Share Story
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Popup */}
        {galleryOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="max-w-6xl max-h-full">
              <Image
                src={currentGallery[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
              />
              <div className="text-center mt-4 text-white">
                <p className="text-sm">
                  {currentImageIndex + 1} / {currentGallery.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
