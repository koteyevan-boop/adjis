'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Heart, HeartHandshake } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function CommunityServiceNewsPage() {
  return (
    <PageLayout title="Community Service Initiative - ADJIS" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="Community Service Initiative"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Community Service Initiative</h1>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>February 15, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Service Learning Coordinator</span>
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
                alt="Students in Community Service"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center gap-6">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Community
                </span>
                <span className="text-gray-500">Service Learning</span>
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
                Students participate in meaningful community service projects, making a positive impact in local communities while developing important life skills and social responsibility.
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Serving Our Community</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                ADJIS's Community Service Initiative embodies our commitment to developing well-rounded students who understand the importance of giving back to society. This program provides opportunities for students to engage in meaningful service that benefits local communities.
              </p>

              {/* Service Project Images */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Environmental Cleanup"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/hero.jpg"
                    alt="Teaching Assistant Program"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Key Service Areas</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Environmental Conservation</h4>
                  <p className="text-gray-600">Students participate in tree planting, beach cleanup, and recycling campaigns to promote environmental sustainability.</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-bold text-teal-800 mb-2">Educational Support</h4>
                  <p className="text-gray-600">Our students provide tutoring and mentoring to younger students in underprivileged communities.</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-bold text-emerald-800 mb-2">Health and Wellness</h4>
                  <p className="text-gray-600">Students organize health awareness campaigns and assist in local health initiatives.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Recent Projects</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                This semester, our students have completed several impactful community service projects, demonstrating their commitment to social responsibility and making tangible differences in people's lives.
              </p>

              {/* Project Showcase */}
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-[200px]">
                    <Image
                      src="/images/hero.jpg"
                      alt="Library Project"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Community Library</h4>
                    <p className="text-gray-600 text-sm">Students helped establish a library in a local community center.</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-[200px]">
                    <Image
                      src="/images/hero.jpg"
                      alt="Food Drive"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Food Drive Campaign</h4>
                    <p className="text-gray-600 text-sm">Collected and distributed food items to families in need.</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-[200px]">
                    <Image
                      src="/images/hero.jpg"
                      alt="Senior Care"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Senior Care Visits</h4>
                    <p className="text-gray-600 text-sm">Regular visits to senior homes providing companionship and assistance.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Student Reflections</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our students have shared powerful reflections on their community service experiences, highlighting how these activities have shaped their perspectives and understanding of social responsibility.
              </p>

              {/* Student Testimonials */}
              <div className="bg-gray-100 rounded-xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Voices</h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="/images/yh.png"
                          alt="Student Portrait"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Ama Osei, Grade 11</h4>
                        <p className="text-gray-600 italic">"Community service has taught me that even small actions can make a big difference. I've learned more about empathy and responsibility than I ever could from textbooks alone."</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="/images/yh.png"
                          alt="Student Portrait"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Kwame Mensah, Grade 10</h4>
                        <p className="text-gray-600 italic">"Working with younger students has helped me develop leadership skills and patience. It's rewarding to see them learn and grow with our help."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Partnerships and Collaboration</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our community service initiatives are strengthened through partnerships with local organizations, NGOs, and government agencies. These collaborations ensure our efforts are sustainable and impactful.
              </p>

              {/* Partner Organizations */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">Educational Partners</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Local Primary Schools</li>
                    <li>• Community Learning Centers</li>
                    <li>• Adult Education Programs</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <h4 className="font-bold text-teal-800 mb-3">Community Organizations</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Environmental NGOs</li>
                    <li>• Healthcare Centers</li>
                    <li>• Senior Care Facilities</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Impact and Outcomes</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Since the launch of our Community Service Initiative, students have contributed over 2,000 service hours, impacting numerous lives and strengthening community bonds. The program continues to grow and evolve based on community needs.
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
                <h4 className="font-bold text-green-800 mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Over 2,000 student service hours completed</li>
                  <li>15 community partnerships established</li>
                  <li>25+ service projects completed this year</li>
                  <li>500+ community members directly impacted</li>
                </ul>
              </div>

              <blockquote className="border-l-4 border-green-600 pl-6 my-8 italic text-gray-600">
                "Community service is not just about giving back; it's about growing together. Our students learn as much from the communities they serve as they contribute."
              </blockquote>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Future Initiatives</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Looking ahead, we plan to expand our community service programs with new projects focused on digital literacy, entrepreneurship support, and environmental sustainability. Students will have more opportunities to lead initiatives and develop their own service projects.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                We invite parents and community members to support our students in these meaningful endeavors. Together, we can build a more compassionate and responsible generation of leaders.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-green-600 text-white rounded-xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
              <p className="text-lg mb-6">Support our community service initiatives or partner with us for greater impact.</p>
              <div className="flex gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Partner With Us
                </Link>
                <Link 
                  href="/admissions" 
                  className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  Join Our Community
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
