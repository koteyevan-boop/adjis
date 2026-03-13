'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Heart, Trophy } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function SportsDayNewsPage() {
  return (
    <PageLayout title="Sports Day 2026 - Record Breaking Performance - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="Sports Day 2026"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Sports Day 2026 - Record Breaking Performance</h1>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>March 5, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>PE Department</span>
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
                alt="Sports Day Championship"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center gap-6">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sports
                </span>
                <span className="text-gray-500">Athletics Competition</span>
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
                Students demonstrate exceptional athletic abilities and sportsmanship during this year's sports day events, breaking multiple school records and showcasing the incredible talent within our ADJIS community.
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Record-Breaking Achievements</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                This year's Sports Day witnessed unprecedented performances across various track and field events. Our athletes demonstrated not only physical prowess but also the spirit of competition and camaraderie that defines ADJIS sports.
              </p>

              {/* Sports Action Images */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="100m Sprint Final"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Long Jump Competition"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">New School Records</h3>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-6">
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="font-semibold text-gray-800">100m Sprint (Boys)</span>
                    <span className="text-orange-600 font-bold">10.8s - Kwame Asante</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-gray-800">Long Jump (Girls)</span>
                    <span className="text-orange-600 font-bold">5.2m - Ama Osei</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-gray-800">4x100m Relay (Mixed)</span>
                    <span className="text-orange-600 font-bold">48.5s - Red House</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-gray-800">High Jump (Boys)</span>
                    <span className="text-orange-600 font-bold">1.75m - Kojo Mensah</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">House Competition Results</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The inter-house competition was fierce this year, with all four houses demonstrating exceptional teamwork and sportsmanship. The final points were the closest we've seen in years.
              </p>

              {/* House Results */}
              <div className="bg-gray-100 rounded-xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Final Standings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-yellow-100 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <span className="font-bold text-lg">Red House</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">285 Points</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-bold">Blue House</span>
                    </div>
                    <span className="text-xl font-bold">278 Points</span>
                  </div>
                  <div className="flex items-center justify-between bg-orange-100 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-bold">Green House</span>
                    </div>
                    <span className="text-xl font-bold">265 Points</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-bold">Yellow House</span>
                    </div>
                    <span className="text-xl font-bold">251 Points</span>
                  </div>
                </div>
              </div>

              {/* Athlete Spotlights */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Star Athletes</h2>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="text-center bg-white rounded-lg p-6 shadow-lg">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/images/yh.png"
                      alt="Athlete Portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-gray-800">Kwame Asante</h4>
                  <p className="text-gray-600 text-sm mb-2">Best Male Athlete</p>
                  <p className="text-orange-600 font-semibold">100m Record</p>
                </div>
                <div className="text-center bg-white rounded-lg p-6 shadow-lg">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/images/yh.png"
                      alt="Athlete Portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-gray-800">Ama Osei</h4>
                  <p className="text-gray-600 text-sm mb-2">Best Female Athlete</p>
                  <p className="text-orange-600 font-semibold">Long Jump Record</p>
                </div>
                <div className="text-center bg-white rounded-lg p-6 shadow-lg">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/images/yh.png"
                      alt="Athlete Portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-gray-800">Yaa Boateng</h4>
                  <p className="text-gray-600 text-sm mb-2">Sportsmanship Award</p>
                  <p className="text-orange-600 font-semibold">All-Round Performance</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Beyond the Competition</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Sports Day is more than just competition; it's about building character, fostering teamwork, and promoting healthy lifestyles. The event brought together students, parents, and staff in a celebration of athletic achievement and school spirit.
              </p>

              <blockquote className="border-l-4 border-orange-500 pl-6 my-8 italic text-gray-600">
                "The true victory today wasn't just in the records broken, but in the sportsmanship displayed and the friendships forged through healthy competition."
              </blockquote>

              <p className="text-gray-600 leading-relaxed mb-6">
                Congratulations to all participants, winners, and organizers for making Sports Day 2026 a memorable event. We look forward to seeing our athletes continue to excel in future competitions.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-orange-500 text-white rounded-xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Sports Programs</h3>
              <p className="text-lg mb-6">Discover the athletic opportunities available at ADJIS.</p>
              <Link 
                href="/about" 
                className="inline-block bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Sports at ADJIS
              </Link>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
