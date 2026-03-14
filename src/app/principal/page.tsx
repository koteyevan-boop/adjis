import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Calendar, Award, BookOpen, Users } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function PrincipalMessagePage() {
  return (
    <PageLayout title="Principal's Message" hideHero>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-64 md:h-80">
          <Image
            src="/images/hero.jpg"
            alt="Principal's Message"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/75 to-blue-800/75" />
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Principal's Message</h1>
              <p className="text-xl text-white/90">A message from our educational leader</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Side-by-side Principal Info and Message */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left Side - Principal Info */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-48 h-48 relative mb-6">
                      <Image
                        src="/images/principal.jpg"
                        alt="School Principal"
                        fill
                        className="object-cover rounded-full border-4 border-white shadow-lg"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Dr. Sarah Johnson</h2>
                    <p className="text-lg text-blue-600 mb-6">School Principal</p>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>principal@adjis.edu.gh</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>+233 30 000 0000</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Message Content */}
                  <div className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Our Educational Community</h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Dear Parents, Students, and Friends of ADJIS,
                      </p>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        It is with great pleasure and pride that I welcome you to Adorable Babies & Josemaria International School. Since our establishment in 2010, we have been committed to providing an exceptional educational experience that nurtures the whole child – intellectually, emotionally, socially, and physically.
                      </p>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        At ADJIS, we believe that education is not just about academic excellence, but about developing well-rounded individuals who are prepared to thrive in an increasingly complex world. Our unique blended curriculum, which combines the Ghana Education Service framework, Montessori philosophy, and Cambridge International standards, ensures that our students receive the best of both international and local educational traditions.
                      </p>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Our dedicated team of educators works tirelessly to create a learning environment that is both challenging and supportive. We understand that each child is unique, with their own strengths, interests, and learning styles. That's why we employ differentiated instruction and personalized learning approaches to ensure that every student reaches their full potential.
                      </p>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Beyond academics, we place great emphasis on character development, leadership skills, and global citizenship. Our students are encouraged to participate in a wide range of extracurricular activities, community service projects, and leadership opportunities that help them develop confidence, resilience, and a sense of social responsibility.
                      </p>
                      
                      <p className="text-gray-600 leading-relaxed mb-8">
                        Whether you are a prospective parent considering ADJIS for your child, a current member of our school community, or a friend of the school, I invite you to explore all that we have to offer. Together, we can provide our children with the foundation they need to become confident, compassionate, and capable leaders of tomorrow.
                      </p>
                      
                      <div className="border-t-2 border-gray-200 pt-6 mt-8">
                        <p className="text-gray-700 font-medium">
                          With warm regards,<br />
                          Dr. Sarah Johnson<br />
                          School Principal<br />
                          Adorable Babies & Josemaria International School
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Philosophy Cards */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Academic Excellence</h4>
                  <p className="text-gray-600">
                    Rigorous curriculum that challenges students to achieve their highest potential
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Character Development</h4>
                  <p className="text-gray-600">
                    Nurturing values, integrity, and social responsibility in every student
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Global Citizenship</h4>
                  <p className="text-gray-600">
                    Preparing students to thrive in an interconnected, multicultural world
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Schedule a Visit</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience the ADJIS difference firsthand. We invite you to tour our campus and meet our dedicated team.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/admissions"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
