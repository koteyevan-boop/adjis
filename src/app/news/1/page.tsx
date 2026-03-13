'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Heart } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function NewsDetailPage() {
  return (
    <PageLayout title="ADJIS Celebrates 70th Anniversary - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gis-green to-gis-green-dark text-white h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/yh.png"
              alt="ADJIS 70th Anniversary"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">ADJIS Celebrates 70th Anniversary</h1>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>March 15, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>ADJIS Admin</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/news" 
            className="inline-flex items-center text-gis-green hover:text-gis-green-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News & Updates
          </Link>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <Image
                src="/images/yh.png"
                alt="ADJIS 70th Anniversary Celebration"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center gap-6">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="text-gray-500">Announcements</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gis-green transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  Like
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Join us as we celebrate seven decades of educational excellence at Adorable Babies & Josemaria International School. This remarkable milestone represents 70 years of nurturing young minds, building character, and shaping futures.
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">A Legacy of Excellence</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Since our founding in 1955, ADJIS has been at the forefront of international education in Ghana. Our commitment to academic excellence, character development, and holistic growth has transformed thousands of young lives.
              </p>

              {/* Additional Images */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="ADJIS Campus"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="ADJIS Students"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Celebrating Our Community</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The 70th anniversary celebrations will feature a series of events throughout the year, including academic competitions, cultural performances, sports tournaments, and community service initiatives. These activities will showcase the incredible talent and achievements of our students, past and present.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                We invite our entire ADJIS family - students, parents, alumni, and staff - to join us in commemorating this special occasion. Together, we will honor our past, celebrate our present, and look forward to an even brighter future.
              </p>

              <blockquote className="border-l-4 border-gis-green pl-6 my-8 italic text-gray-600">
                "For 70 years, ADJIS has been more than just a school - it has been a home away from home, a place where dreams are nurtured and futures are forged."
              </blockquote>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Looking Ahead</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                As we celebrate this milestone, we remain committed to our mission of providing internationally diverse education that instills understanding of each other and promotes holistic development. The next 70 years promise even greater achievements as we continue to innovate and inspire.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gis-green text-white rounded-xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Join the Celebration!</h3>
              <p className="text-lg mb-6">Be part of our 70th anniversary celebrations and help us create lasting memories.</p>
              <Link 
                href="/contact" 
                className="inline-block bg-white text-gis-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
