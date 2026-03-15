'use client';

import PortalHeader from '@/components/PortalHeader';
import TeacherPortal from '@/components/TeacherPortal';
import PortalGuard from '@/components/PortalGuard';

export default function StaffPortalPage() {
  // In a real app, this would come from authentication/user context
  const teacherInfo = {
    role: 'subject', // or 'class' for class teachers
    name: 'Mr. Johnson',
    id: 'teacher1',
    assignedClasses: ['Grade 7A', 'Grade 7B'],
    assignedSubjects: ['Mathematics']
  };

  return (
    <PortalGuard portalType="teacher">
      <PortalHeader
        portalType="teacher"
        userName={teacherInfo.name}
        userRole={`${teacherInfo.role === 'class' ? 'Class' : 'Subject'} Teacher`}
        notifications={2}
        onNotificationClick={() => console.log('Teacher notifications clicked')}
        onSettingsClick={() => console.log('Teacher settings clicked')}
      />
      <TeacherPortal
        teacherRole={teacherInfo.role}
        teacherName={teacherInfo.name}
        teacherId={teacherInfo.id}
        assignedClasses={teacherInfo.assignedClasses}
        assignedSubjects={teacherInfo.assignedSubjects}
      />
    </PortalGuard>
  );
}
