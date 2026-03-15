'use client';

import PortalHeader from '@/components/PortalHeader';
import AdminPortal from '@/components/AdminPortal';
import PortalGuard from '@/components/PortalGuard';

export default function AdminPortalPage() {
  return (
    <PortalGuard portalType="admin">
      <PortalHeader
        portalType="admin"
        userName="Super Admin"
        userRole="Administrator"
        notifications={5}
        onNotificationClick={() => console.log('Admin notifications clicked')}
        onSettingsClick={() => console.log('Admin settings clicked')}
      />
      <AdminPortal />
    </PortalGuard>
  );
}
