'use client';

import { useState, useRef, useEffect } from 'react';
import { Save, Send, Download, Upload, Edit3, Eraser, Square, Circle, Triangle, Type, Palette, Undo, Redo, ZoomIn, ZoomOut, RotateCw, FileText, Image, Video, Music, Plus, X, CheckCircle, Clock, Users } from 'lucide-react';

interface DrawingTool {
  id: string;
  name: string;
  icon: any;
  type: 'pencil' | 'eraser' | 'shape' | 'text' | 'color';
}

interface Shape {
  id: string;
  type: 'rectangle' | 'circle' | 'triangle' | 'line';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  strokeWidth: number;
}

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  teacher: string;
  dueDate: Date;
  materials: any[];
  instructions: string;
  maxScore: number;
}

export default function InteractiveAssignment({ assignment }: { assignment: Assignment }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pencil');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [texts, setTexts] = useState<TextElement[]>([]);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [showTextInput, setShowTextInput] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'
  ];

  const tools: DrawingTool[] = [
    { id: 'pencil', name: 'Pencil', icon: Edit3, type: 'pencil' },
    { id: 'eraser', name: 'Eraser', icon: Eraser, type: 'eraser' },
    { id: 'rectangle', name: 'Rectangle', icon: Square, type: 'shape' },
    { id: 'circle', name: 'Circle', icon: Circle, type: 'shape' },
    { id: 'triangle', name: 'Triangle', icon: Triangle, type: 'shape' },
    { id: 'text', name: 'Text', icon: Type, type: 'text' },
    { id: 'color', name: 'Color', icon: Palette, type: 'color' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw shapes
    shapes.forEach(shape => {
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.strokeWidth;
      ctx.beginPath();
      
      if (shape.type === 'rectangle') {
        ctx.rect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY);
      } else if (shape.type === 'circle') {
        const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
        ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
      } else if (shape.type === 'triangle') {
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        ctx.lineTo(shape.startX - (shape.endX - shape.startX), shape.endY);
        ctx.closePath();
      } else if (shape.type === 'line') {
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
      }
      
      ctx.stroke();
    });

    // Draw texts
    texts.forEach(text => {
      ctx.fillStyle = text.color;
      ctx.font = `${text.fontSize}px Arial`;
      ctx.fillText(text.text, text.x, text.y);
    });
  }, [shapes, texts]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'text') {
      setTextPosition({ x, y });
      setShowTextInput(true);
      return;
    }

    setIsDrawing(true);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'pencil') {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = strokeWidth * 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'pencil' || currentTool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (['rectangle', 'circle', 'triangle'].includes(currentTool)) {
      const newShape: Shape = {
        id: Date.now().toString(),
        type: currentTool as 'rectangle' | 'circle' | 'triangle',
        startX: 0,
        startY: 0,
        endX: x,
        endY: y,
        color: currentColor,
        strokeWidth: strokeWidth
      };
      
      // For simplicity, we'll use a fixed starting point
      newShape.startX = x - 50;
      newShape.startY = y - 50;
      
      setShapes(prev => [...prev, newShape]);
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';
    }

    setIsDrawing(false);
    saveToHistory();
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(imageData);
    
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.putImageData(history[historyStep - 1], 0, 0);
        }
      }
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.putImageData(history[historyStep + 1], 0, 0);
        }
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setShapes([]);
    setTexts([]);
    saveToHistory();
  };

  const addText = () => {
    if (textInput.trim()) {
      const newText: TextElement = {
        id: Date.now().toString(),
        text: textInput,
        x: textPosition.x,
        y: textPosition.y,
        fontSize: 16,
        color: currentColor
      };
      
      setTexts(prev => [...prev, newText]);
      setTextInput('');
      setShowTextInput(false);
      saveToHistory();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedAudio(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `assignment-${assignment.id}-answer.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const submitAssignment = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a complete submission object
    const submission = {
      assignmentId: assignment.id,
      answerText,
      canvasData: canvas.toDataURL(),
      files: uploadedFiles,
      audioRecording: recordedAudio,
      submittedAt: new Date()
    };

    // In a real implementation, this would be sent to the server
    console.log('Submitting assignment:', submission);
    alert('Assignment submitted successfully!');
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Assignment Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{assignment.title}</h2>
              <p className="text-gray-600">{assignment.subject} • {assignment.teacher}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                Due: {assignment.dueDate.toLocaleDateString()}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Max Score: {assignment.maxScore}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Instructions</h3>
            <p className="text-gray-700">{assignment.instructions}</p>
          </div>
        </div>

        {/* Drawing Tools */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    if (tool.type === 'color') {
                      setShowColorPicker(!showColorPicker);
                    } else {
                      setCurrentTool(tool.id);
                    }
                  }}
                  className={`p-2 rounded-lg ${
                    currentTool === tool.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                  title={tool.name}
                >
                  <tool.icon className="h-4 w-4" />
                </button>
              ))}
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <button
                onClick={undo}
                disabled={historyStep <= 0}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                title="Undo"
              >
                <Undo className="h-4 w-4" />
              </button>
              
              <button
                onClick={redo}
                disabled={historyStep >= history.length - 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                title="Redo"
              >
                <Redo className="h-4 w-4" />
              </button>
              
              <button
                onClick={clearCanvas}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Clear"
              >
                <RotateCw className="h-4 w-4" />
              </button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Size:</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-600">{strokeWidth}px</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Color Picker */}
          {showColorPicker && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setCurrentColor(color);
                      setShowColorPicker(false);
                    }}
                    className={`w-8 h-8 rounded-lg border-2 ${
                      currentColor === color ? 'border-gray-900' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="p-6">
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-96 cursor-crosshair"
              style={{ transform: `scale(${zoom})` }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          
          {/* Text Input Modal */}
          {showTextInput && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Text</h3>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={addText}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowTextInput(false);
                      setTextInput('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Answer Section */}
        <div className="border-t border-gray-200 p-6">
          <div className="space-y-6">
            {/* Text Answer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Written Answer</label>
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  Upload Files
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mp3,.wav"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {file.type.startsWith('image/') && <Image className="h-4 w-4 text-green-600" />}
                          {file.type.startsWith('video/') && <Video className="h-4 w-4 text-purple-600" />}
                          {file.type.startsWith('audio/') && <Music className="h-4 w-4 text-orange-600" />}
                          {!file.type.startsWith('image/') && !file.type.startsWith('video/') && !file.type.startsWith('audio/') && <FileText className="h-4 w-4 text-blue-600" />}
                          <span className="text-sm text-gray-900">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Audio Recording */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Voice Recording</label>
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    Stop Recording
                  </button>
                )}
                
                {recordedAudio && (
                  <div className="flex items-center gap-2">
                    <audio controls src={URL.createObjectURL(recordedAudio)} className="h-8" />
                    <button
                      onClick={() => setRecordedAudio(null)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={downloadCanvas}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download className="h-4 w-4" />
                Download Drawing
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Save className="h-4 w-4" />
                Save Draft
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={submitAssignment}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
