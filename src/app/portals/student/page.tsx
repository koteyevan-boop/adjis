'use client';

import PortalHeader from '@/components/PortalHeader';
import FigmaStudentDashboard from '@/components/FigmaStudentDashboard';
import PortalGuard from '@/components/PortalGuard';

export default function StudentPortalPage() {
  return (
    <PortalGuard portalType="student">
      <PortalHeader
        portalType="student"
        userName="Kofi Asante"
        userRole="Student"
        notifications={3}
        onNotificationClick={() => console.log('Student notifications clicked')}
        onSettingsClick={() => console.log('Student settings clicked')}
      />
      <FigmaStudentDashboard />
    </PortalGuard>
  );
}
