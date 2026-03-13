'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Heart, Music } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function CulturalFestivalNewsPage() {
  return (
    <PageLayout title="Cultural Festival Showcases Student Talent - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="Cultural Festival"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Cultural Festival Showcases Student Talent</h1>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>February 28, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Arts Department</span>
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
                src="/images/hero.jpg"
                alt="Cultural Festival Performance"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center gap-6">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Events
                </span>
                <span className="text-gray-500">Arts & Culture</span>
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
                A vibrant display of cultural diversity and artistic talent at our annual cultural festival, where students showcased their heritage through music, dance, drama, and visual arts.
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Celebrating Diversity</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The ADJIS Cultural Festival 2026 brought together students from various backgrounds to celebrate our rich cultural heritage. The event featured performances representing different Ghanaian cultures and international traditions, reflecting our school's diverse community.
              </p>

              {/* Cultural Performance Images */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Traditional Dance Performance"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Music Ensemble"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Event Highlights</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-2">Traditional Dance Performances</h4>
                  <p className="text-gray-600">Students performed various traditional dances including Adowa, Kete, and Borborbor, showcasing the beauty of Ghanaian cultural heritage.</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-bold text-pink-800 mb-2">Musical Showcase</h4>
                  <p className="text-gray-600">Our school choir and band performed both traditional and contemporary pieces, demonstrating exceptional musical talent.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-indigo-800 mb-2">Drama Presentations</h4>
                  <p className="text-gray-600">Students presented original plays and adaptations that highlighted important social and cultural themes.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Art Exhibition</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The visual arts section featured impressive artworks from our students, including paintings, sculptures, and crafts that reflected various cultural influences and personal expressions.
              </p>

              {/* Art Gallery */}
              <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Student Artwork"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Cultural Crafts"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Painting Exhibition"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Student Achievements</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Several students received special recognition for their outstanding contributions to the festival. These awards celebrate not just talent, but also dedication and cultural appreciation.
              </p>

              {/* Award Winners */}
              <div className="bg-gray-100 rounded-xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Award Recipients</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/yh.png"
                        alt="Award Winner"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Best Performer</h4>
                      <p className="text-gray-600">Ama Mensah - Traditional Dance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/yh.png"
                        alt="Award Winner"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Best Musician</h4>
                      <p className="text-gray-600">Kwame Osei - Piano Performance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/yh.png"
                        alt="Award Winner"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Best Artist</h4>
                      <p className="text-gray-600">Yaa Asantewaa - Visual Arts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/yh.png"
                        alt="Award Winner"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Cultural Ambassador</h4>
                      <p className="text-gray-600">Kojo Annan - Overall Contribution</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Community Impact</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The cultural festival was not just a school event but a community celebration. Parents, alumni, and local community members attended, making it a truly inclusive celebration of arts and culture.
              </p>

              <blockquote className="border-l-4 border-purple-600 pl-6 my-8 italic text-gray-600">
                "Through arts and culture, our students learn to appreciate diversity, express themselves creatively, and build bridges across different communities."
              </blockquote>

              <p className="text-gray-600 leading-relaxed mb-6">
                The Cultural Festival continues to be a highlight of our school calendar, providing a platform for students to showcase their talents while celebrating our rich cultural heritage.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-purple-600 text-white rounded-xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Support Arts Education</h3>
              <p className="text-lg mb-6">Help us continue nurturing artistic talent and cultural appreciation.</p>
              <Link 
                href="/about" 
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Discover Our Arts Programs
              </Link>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
