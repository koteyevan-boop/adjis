'use client';

import { useState, useEffect } from 'react';
import UniversalProfile from '@/components/UniversalProfile';
import PortalGuard from '@/components/PortalGuard';

export default function ProfilePage() {
  const [userType, setUserType] = useState<'admin' | 'teacher' | 'student' | 'parent'>('student');
  const [userData, setUserData] = useState<any>({
    name: 'John Doe',
    email: 'john.doe@adjis.edu',
    phone: '+233 24 123 4567',
    role: 'Student',
    grade: 'Grade 7',
    section: 'A',
    joinDate: '2020-09-01',
    lastLogin: new Date().toISOString()
  });

  useEffect(() => {
    // Get user type from localStorage based on portal auth
    const checkUserType = () => {
      const adminAuth = localStorage.getItem('portal_auth_admin');
      const teacherAuth = localStorage.getItem('portal_auth_teacher');
      const studentAuth = localStorage.getItem('portal_auth_student');
      const parentAuth = localStorage.getItem('portal_auth_parent');

      if (adminAuth === 'true') {
        setUserType('admin');
        setUserData({
          name: 'Super Admin',
          email: 'admin@adjis.edu',
          phone: '+233 24 123 4567',
          role: 'System Administrator',
          department: 'IT Administration',
          joinDate: '2020-01-01',
          lastLogin: new Date().toISOString()
        });
      } else if (teacherAuth === 'true') {
        setUserType('teacher');
        setUserData({
          name: 'Mr. Johnson',
          email: 'johnson@adjis.edu',
          phone: '+233 24 123 4567',
          role: 'Subject Teacher',
          department: 'Mathematics',
          joinDate: '2020-08-15',
          lastLogin: new Date().toISOString()
        });
      } else if (studentAuth === 'true') {
        setUserType('student');
        setUserData({
          name: 'Kofi Asante',
          email: 'kofi.asante@adjis.edu',
          phone: '+233 24 123 4567',
          role: 'Student',
          grade: 'Grade 7',
          section: 'A',
          joinDate: '2020-09-01',
          lastLogin: new Date().toISOString()
        });
      } else if (parentAuth === 'true') {
        setUserType('parent');
        setUserData({
          name: 'Mr. Asante',
          email: 'asante.parent@adjis.edu',
          phone: '+233 24 987 6543',
          role: 'Parent',
          joinDate: '2020-09-01',
          lastLogin: new Date().toISOString()
        });
      }
    };

    checkUserType();
  }, []);

  const getAdditionalInfo = () => {
    switch (userType) {
      case 'admin':
        return {
          access_level: 'Super Admin',
          permissions: 'Full System Access',
          managed_users: '1245',
          system_health: '98.5%'
        };
      case 'teacher':
        return {
          subject: 'Mathematics',
          classes_taught: 'Grade 7A, Grade 7B',
          experience: '5 years',
          qualifications: 'B.Ed Mathematics'
        };
      case 'student':
        return {
          student_id: 'STU2024001',
          class_rank: '#3',
          attendance_rate: '95.2%',
          gpa: '3.7'
        };
      case 'parent':
        return {
          children_count: '2',
          parent_id: 'PAR2024001',
          total_fees_paid: 'GHS 3500',
          next_meeting: '2024-03-25'
        };
      default:
        return {};
    }
  };

  const handleEdit = () => {
    console.log('Edit profile clicked');
  };

  const handleSave = (data: any) => {
    console.log('Save profile data:', data);
    // Update user data
    setUserData((prev: any) => ({ ...prev, ...data }));
  };

  return (
    <PortalGuard portalType={userType}>
      <UniversalProfile
        userType={userType}
        userData={userData}
        additionalInfo={getAdditionalInfo()}
        onEdit={handleEdit}
        onSave={handleSave}
      />
    </PortalGuard>
  );
}
