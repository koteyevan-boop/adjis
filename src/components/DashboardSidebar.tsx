'use client';

import { useState } from 'react';
import { 
  Home,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Mail,
  Upload,
  BarChart3,
  Bell,
  Search,
  User,
  GraduationCap
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
  children?: SidebarItem[];
}

interface DashboardSidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
  teacherName: string;
  teacherRole: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function DashboardSidebar({ 
  activeItem, 
  onItemSelect, 
  teacherName, 
  teacherRole,
  isCollapsed = false,
  onToggleCollapse
}: DashboardSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home
    },
    {
      id: 'classes',
      label: 'Classes',
      icon: Users,
      children: [
        { id: 'grade-7a', label: 'Grade 7A', icon: Users },
        { id: 'grade-7b', label: 'Grade 7B', icon: Users },
        { id: 'grade-8a', label: 'Grade 8A', icon: Users },
        { id: 'grade-8b', label: 'Grade 8B', icon: Users }
      ]
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: FileText,
      badge: 12
    },
    {
      id: 'gradebook',
      label: 'Gradebook',
      icon: Award
    },
    {
      id: 'materials',
      label: 'Learning Materials',
      icon: Upload
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: Mail,
      badge: 3
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Calendar
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;
    const hasActiveChild = item.children?.some(child => activeItem === child.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onItemSelect(item.id);
            }
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive || hasActiveChild
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
          } ${isCollapsed ? 'justify-center' : ''}`}
          style={{ paddingLeft: isCollapsed ? '12px' : `${12 + level * 16}px` }}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
              <div className="flex items-center gap-2">
                {item.badge && item.badge > 0 && (
                  <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
                {hasChildren && (
                  isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )
                )}
              </div>
            </>
          )}
        </button>

        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col ${
      isCollapsed ? 'w-16' : 'w-64'
    } transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">ADJIS</h2>
              <p className="text-xs text-gray-500 truncate">Teacher Portal</p>
            </div>
          )}

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform ${
                !isCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
          )}
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{teacherName}</p>
              <p className="text-xs text-gray-500 truncate">{teacherRole}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        )}
        
        {isCollapsed && (
          <button className="w-full flex items-center justify-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
