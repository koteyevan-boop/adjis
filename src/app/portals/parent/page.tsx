'use client';

import PortalHeader from '@/components/PortalHeader';
import FigmaParentDashboard from '@/components/FigmaParentDashboard';
import PortalGuard from '@/components/PortalGuard';

export default function ParentPortalPage() {
  return (
    <PortalGuard portalType="parent">
      <PortalHeader
        portalType="parent"
        userName="Mr. Asante"
        userRole="Parent"
        notifications={5}
        onNotificationClick={() => console.log('Parent notifications clicked')}
        onSettingsClick={() => console.log('Parent settings clicked')}
      />
      <FigmaParentDashboard />
    </PortalGuard>
  );
}
