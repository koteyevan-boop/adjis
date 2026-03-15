'use client';

import PortalGuard from '@/components/PortalGuard';
import StudentPortal from '@/components/StudentPortal';

export default function StudentPortalPage() {
  return (
    <PortalGuard portalType="student">
      <StudentPortal />
    </PortalGuard>
  );
}
