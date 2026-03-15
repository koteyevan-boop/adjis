'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Image, Video, Music, Link, Folder, Search, Filter, Plus, Edit, Trash2, Download, Eye, Cloud, Clock, Users, BookOpen, FileText as Assignment } from 'lucide-react';

interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'link' | 'folder';
  subject: string;
  class: string;
  teacher: string;
  uploadedAt: Date;
  size?: number;
  url?: string;
  googleDriveId?: string;
  tags: string[];
  downloads: number;
  isPublic: boolean;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  teacher: string;
  dueDate: Date;
  materials: string[];
  submissions: number;
  totalStudents: number;
  isPublished: boolean;
}

export default function LearningMaterials({ teacherRole, teacherId, teacherName }: { 
  teacherRole: string; 
  teacherId: string; 
  teacherName: string;
}) {
  const [activeTab, setActiveTab] = useState("materials");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedClass, setSelectedClass] = useState("Grade 7A");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [showGoogleDrive, setShowGoogleDrive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [materials, setMaterials] = useState<LearningMaterial[]>([
    {
      id: "1",
      title: "Algebra Basics - Chapter 1",
      description: "Introduction to algebraic expressions and equations",
      type: "document",
      subject: "Mathematics",
      class: "Grade 7A",
      teacher: "Mr. Johnson",
      uploadedAt: new Date(),
      size: 2048576,
      url: "/materials/algebra-basics.pdf",
      tags: ["algebra", "basics", "chapter1"],
      downloads: 45,
      isPublic: true
    },
    {
      id: "2",
      title: "Geometry Shapes Video",
      description: "Visual explanation of geometric shapes and properties",
      type: "video",
      subject: "Mathematics",
      class: "Grade 7A",
      teacher: "Mr. Johnson",
      uploadedAt: new Date(),
      size: 52428800,
      url: "/materials/geometry-shapes.mp4",
      tags: ["geometry", "shapes", "video"],
      downloads: 32,
      isPublic: true
    },
    {
      id: "3",
      title: "Math Formulas Reference",
      description: "Quick reference guide for common mathematical formulas",
      type: "document",
      subject: "Mathematics",
      class: "Grade 7A",
      teacher: "Mr. Johnson",
      uploadedAt: new Date(),
      googleDriveId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      tags: ["formulas", "reference"],
      downloads: 67,
      isPublic: true
    }
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Linear Equations Assignment",
      description: "Solve the following linear equations and show your work",
      subject: "Mathematics",
      class: "Grade 7A",
      teacher: "Mr. Johnson",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      materials: ["1", "2"],
      submissions: 12,
      totalStudents: 25,
      isPublished: true
    }
  ]);

  const subjects = ["Mathematics", "English", "Science", "Social Studies", "French", "ICT"];
  const classes = ["Grade 7A", "Grade 7B", "Grade 8A", "Grade 8B", "Grade 9A", "Grade 9B"];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setIsUploading(true);
      
      Array.from(files).forEach(file => {
        const newMaterial: LearningMaterial = {
          id: Date.now().toString() + Math.random().toString(),
          title: file.name,
          description: `Uploaded ${file.name}`,
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('video/') ? 'video' : 
                file.type.startsWith('audio/') ? 'audio' : 'document',
          subject: selectedSubject,
          class: selectedClass,
          teacher: teacherName,
          uploadedAt: new Date(),
          size: file.size,
          url: URL.createObjectURL(file),
          tags: [],
          downloads: 0,
          isPublic: true
        };
        
        setMaterials(prev => [newMaterial, ...prev]);
      });
      
      setTimeout(() => setIsUploading(false), 1000);
    }
  };

  const handleGoogleDriveUpload = (files: any[]) => {
    setIsUploading(true);
    
    files.forEach(file => {
      const newMaterial: LearningMaterial = {
        id: Date.now().toString() + Math.random().toString(),
        title: file.name,
        description: `Uploaded from Google Drive`,
        type: file.mimeType.startsWith('image/') ? 'image' : 
              file.mimeType.startsWith('video/') ? 'video' : 
              file.mimeType.startsWith('audio/') ? 'audio' : 'document',
        subject: selectedSubject,
        class: selectedClass,
        teacher: teacherName,
        uploadedAt: new Date(),
        size: file.size,
        googleDriveId: file.id,
        url: file.webViewLink,
        tags: [],
        downloads: 0,
        isPublic: true
      };
      
      setMaterials(prev => [newMaterial, ...prev]);
    });
    
    setTimeout(() => setIsUploading(false), 1000);
    setShowGoogleDrive(false);
  };

  const deleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const createAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: "New Assignment",
      description: "Assignment description",
      subject: selectedSubject,
      class: selectedClass,
      teacher: teacherName,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      materials: [],
      submissions: 0,
      totalStudents: 25,
      isPublished: false
    };
    
    setAssignments(prev => [newAssignment, ...prev]);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4 text-green-600" />;
      case 'video': return <Video className="h-4 w-4 text-purple-600" />;
      case 'audio': return <Music className="h-4 w-4 text-orange-600" />;
      case 'link': return <Link className="h-4 w-4 text-blue-600" />;
      case 'folder': return <Folder className="h-4 w-4 text-yellow-600" />;
      default: return <FileText className="h-4 w-4 text-blue-600" />;
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || material.type === filterType;
    const matchesSubject = material.subject === selectedSubject;
    const matchesClass = material.class === selectedClass;
    
    return matchesSearch && matchesType && matchesSubject && matchesClass;
  });

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "materials", label: "Learning Materials", icon: BookOpen },
              { id: "assignments", label: "Assignments", icon: Assignment },
              { id: "shared", label: "Shared Resources", icon: Cloud },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "materials" && (
            <div className="space-y-6">
              {/* Header Controls */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Learning Materials</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Types</option>
                  <option value="document">Documents</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                </select>
              </div>

              {/* Upload Options */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-700 mb-4">Upload Learning Materials</h4>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Upload from Computer
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mp3,.wav"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <button
                    onClick={() => setShowGoogleDrive(true)}
                    className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <Cloud className="h-4 w-4" />
                    Google Drive
                  </button>
                  
                  <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Link className="h-4 w-4" />
                    Add Link
                  </button>
                  
                  <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Folder className="h-4 w-4" />
                    Create Folder
                  </button>
                </div>
                
                {isUploading && (
                  <div className="mt-4 flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>Uploading materials...</span>
                  </div>
                )}
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => (
                  <div key={material.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(material.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">{material.title}</h4>
                          <p className="text-sm text-gray-500">{material.subject} • {material.class}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteMaterial(material.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{material.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span>{formatFileSize(material.size)}</span>
                        <span>{material.downloads} downloads</span>
                      </div>
                      {material.googleDriveId && (
                        <div className="flex items-center gap-1">
                          <Cloud className="h-3 w-3" />
                          <span>Drive</span>
                        </div>
                      )}
                    </div>
                    
                    {material.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {material.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        <Eye className="h-3 w-3" />
                        Preview
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        <Plus className="h-3 w-3" />
                        Assignment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Assignments</h3>
                <button
                  onClick={createAssignment}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Create Assignment
                </button>
              </div>

              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">{assignment.subject} • {assignment.class}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          assignment.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.isPublished ? 'Published' : 'Draft'}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{assignment.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        Due: {assignment.dueDate.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {assignment.submissions}/{assignment.totalStudents} submitted
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="h-4 w-4" />
                        {assignment.materials.length} materials attached
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        View Submissions
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        Edit Assignment
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        Attach Materials
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "shared" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Shared Resources</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Cloud className="h-6 w-6 text-blue-600" />
                  <h4 className="text-md font-medium text-blue-900">Google Drive Integration</h4>
                </div>
                <p className="text-blue-800 mb-4">
                  Connect your Google Drive to easily share learning materials with students and other teachers.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Connect Google Drive
                </button>
              </div>
              
              <div className="text-center py-12 text-gray-500">
                <Cloud className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No shared resources available yet.</p>
                <p className="text-sm">Connect Google Drive or upload materials to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Google Drive Modal */}
      {showGoogleDrive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Select from Google Drive</h3>
              <button
                onClick={() => setShowGoogleDrive(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="text-center py-8">
              <Cloud className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 mb-4">Connect your Google Drive to select files</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Connect Google Drive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
