import Link from 'next/link';
import Image from 'next/image';
import UnifiedPortalLogin from '@/components/UnifiedPortalLogin';

export default function PortalsPage() {
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

      {/* Main Content - Unified Login */}
      <div className="flex-1">
        <UnifiedPortalLogin />
      </div>
    </div>
  );
}
