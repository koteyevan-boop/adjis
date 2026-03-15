'use client';

import PortalGuard from '@/components/PortalGuard';
import ParentPortal from '@/components/ParentPortal';

export default function ParentPortalPage() {
  return (
    <PortalGuard portalType="parent">
      <ParentPortal />
    </PortalGuard>
  );
}
