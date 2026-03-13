'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Heart, Trophy } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function ScienceFairNewsPage() {
  return (
    <PageLayout title="Science Fair Winners Announced - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="Science Fair Winners"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Science Fair Winners Announced</h1>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>March 10, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Science Department</span>
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
                alt="Science Fair Exhibition"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center gap-6">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Academics
                </span>
                <span className="text-gray-500">Science Competition</span>
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
                Our students showcase innovative projects at the annual science fair, with winners advancing to regional competitions. This year's science fair demonstrated exceptional creativity and scientific thinking among our young researchers.
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Outstanding Projects</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The annual ADJIS Science Fair brought together students from all grade levels to present their research projects, experiments, and innovations. Judges were impressed by the depth of knowledge and creativity displayed in this year's entries.
              </p>

              {/* Science Fair Images */}
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="relative h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Robotics Project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Chemistry Experiment"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Environmental Project"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">First Place Winners</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><strong>Senior Division:</strong> "Renewable Energy Solutions" by Ama Kofi and Kwame Asante</li>
                <li><strong>Junior Division:</strong> "Water Purification System" by Yaa Boateng and Kojo Mensah</li>
                <li><strong>Primary Division:</strong> "Plant Growth Experiments" by Akua Osei</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Regional Competition Ahead</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The first and second place winners will represent ADJIS at the upcoming Regional Science Competition to be held next month. Our students have consistently performed well at regional levels, and we have high hopes for this year's team.
              </p>

              {/* Winner Showcase */}
              <div className="bg-gray-100 rounded-xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meet Our Champions</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src="/images/yh.png"
                        alt="Winner Portrait"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-gray-800">Ama Kofi</h4>
                    <p className="text-gray-600">Senior Division Winner</p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src="/images/yh.png"
                        alt="Winner Portrait"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-gray-800">Yaa Boateng</h4>
                    <p className="text-gray-600">Junior Division Winner</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Teacher Recognition</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Special recognition goes to Ms. Patricia Osei, Science Department Head, and Mr. Samuel Mensah, whose dedication and guidance have been instrumental in nurturing our students' scientific talents.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 my-8 italic text-gray-600">
                "The quality of projects this year exceeded our expectations. Our students are not just learning science; they are thinking like scientists and solving real-world problems."
              </blockquote>

              <p className="text-gray-600 leading-relaxed mb-6">
                Congratulations to all participants for their hard work and dedication. The science fair continues to be a highlight of our academic calendar, showcasing the best of ADJIS's STEM education.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 text-white rounded-xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Support STEM Education</h3>
              <p className="text-lg mb-6">Help us continue providing exceptional science education opportunities for our students.</p>
              <Link 
                href="/admissions" 
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Learn More About Our Programs
              </Link>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
