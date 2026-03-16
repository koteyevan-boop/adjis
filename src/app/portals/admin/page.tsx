'use client';

import PortalHeader from '@/components/PortalHeader';
import FigmaAdminDashboard from '@/components/FigmaAdminDashboard';
import PortalGuard from '@/components/PortalGuard';

export default function AdminPortalPage() {
  return (
    <PortalGuard portalType="admin">
      <PortalHeader
        portalType="admin"
        userName="Super Admin"
        userRole="System Administrator"
        notifications={7}
        onNotificationClick={() => console.log('Admin notifications clicked')}
        onSettingsClick={() => console.log('Admin settings clicked')}
      />
      <FigmaAdminDashboard />
    </PortalGuard>
  );
}
