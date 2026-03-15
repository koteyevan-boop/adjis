'use client';

import PortalHeader from '@/components/PortalHeader';
import TeacherPortal from '@/components/TeacherPortal';
import PortalGuard from '@/components/PortalGuard';

export default function StaffPortalPage() {
  return (
    <PortalGuard portalType="teacher">
      <PortalHeader
        portalType="teacher"
        userName="Mr. Johnson"
        userRole="Mathematics Teacher"
        notifications={2}
        onNotificationClick={() => console.log('Teacher notifications clicked')}
        onSettingsClick={() => console.log('Teacher settings clicked')}
      />
      <TeacherPortal />
    </PortalGuard>
  );
}
