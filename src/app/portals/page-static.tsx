// Static version of portals page for website export
import Link from 'next/link';
import Image from 'next/image';

export default function PortalsPageStatic() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo1.jpg"
                alt="ADJIS"
                width={120}
                height={60}
                className="h-14 w-auto"
              />
              <h2 className="text-xl font-bold">Adorable Babies & Josemaria International School</h2>
            </Link>
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              <Image
                className="mx-auto h-12 w-auto sm:h-14"
                src="/images/logo1.jpg"
                alt="ADJIS Logo"
                width={120}
                height={60}
              />
              <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-900">ADJIS Portal Access</h2>
              <p className="mt-2 text-sm text-gray-600 px-4 sm:px-0">
                Adorable Babies & Josemaria International School
              </p>
            </div>

            <div className="mt-6 sm:mt-8 bg-white shadow-lg rounded-lg p-4 sm:p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select Your Portal</h3>
                <div className="space-y-3">
                  <a 
                    href="https://portal.josemariaschoolgh.org/student"
                    className="block w-full p-4 rounded-lg border-2 text-center transition-colors border-blue-500 bg-blue-50 hover:bg-blue-100"
                  >
                    <div className="text-2xl mb-2">🎓</div>
                    <div className="text-sm font-medium">Student Portal</div>
                    <div className="text-xs text-gray-500 mt-1">Access assignments, grades, and schedule</div>
                  </a>
                  
                  <a 
                    href="https://portal.josemariaschoolgh.org/parent"
                    className="block w-full p-4 rounded-lg border-2 text-center transition-colors border-green-500 bg-green-50 hover:bg-green-100"
                  >
                    <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                    <div className="text-sm font-medium">Parent Portal</div>
                    <div className="text-xs text-gray-500 mt-1">Monitor your child's progress</div>
                  </a>
                  
                  <a 
                    href="https://portal.josemariaschoolgh.org/admin"
                    className="block w-full p-4 rounded-lg border-2 text-center transition-colors border-red-500 bg-red-50 hover:bg-red-100"
                  >
                    <div className="text-2xl mb-2">⚙️</div>
                    <div className="text-sm font-medium">Admin Portal</div>
                    <div className="text-xs text-gray-500 mt-1">Manage school operations</div>
                  </a>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  For login assistance, please contact the school administration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
