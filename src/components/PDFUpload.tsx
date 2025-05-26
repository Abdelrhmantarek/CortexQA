
import { useState, useRef } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AnimatedLogo from './AnimatedLogo';

interface PDFUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  uploadedFile: File | null;
  isFileUploaded: boolean;
}

const PDFUpload = ({ onFileUpload, isLoading, uploadedFile, isFileUploaded }: PDFUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Drag and Drop Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-400 bg-blue-50 scale-105 shadow-lg'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className={`mx-auto w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center transition-all duration-300 ${
            dragActive ? 'scale-110 bg-gradient-to-br from-blue-100 to-blue-200' : ''
          }`}>
            <Upload className={`h-6 w-6 text-gray-600 transition-all duration-300 ${
              dragActive ? 'text-blue-600 animate-bounce' : ''
            }`} />
          </div>
          
          <div className="animate-fade-in delay-150">
            <p className="text-lg font-medium text-gray-900">
              Drop your PDF here or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 underline transition-colors duration-200 hover:scale-105 inline-block"
              >
                browse files
              </button>
            </p>
            <p className="text-sm text-gray-500 mt-1 animate-fade-in delay-300">
              Supports PDF files up to 50MB
            </p>
          </div>
        </div>
      </div>

      {/* Selected File Display */}
      {selectedFile && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg animate-slide-in-right">
          <div className="flex items-center space-x-3">
            <File className="h-5 w-5 text-red-600 animate-bounce" />
            <div>
              <p className="font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          {isFileUploaded ? (
            <CheckCircle className="h-5 w-5 text-green-600 animate-pulse" />
          ) : (
            <Button
              onClick={handleUpload}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <AnimatedLogo size="sm" isLoading={true} className="mr-2" />
                  Uploading...
                </>
              ) : (
                'Upload PDF'
              )}
            </Button>
          )}
        </div>
      )}

      {/* Upload Progress */}
      {isLoading && (
        <div className="space-y-2 animate-fade-in">
          <Progress value={75} className="h-2 animate-pulse" />
          <p className="text-sm text-gray-600 text-center animate-bounce">
            Processing PDF and extracting content...
          </p>
        </div>
      )}

      {/* Upload Status */}
      {isFileUploaded && uploadedFile && (
        <div className="flex items-center space-x-2 text-green-600 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg animate-fade-in border border-green-200">
          <CheckCircle className="h-5 w-5 animate-pulse" />
          <span className="font-medium">PDF processed successfully!</span>
        </div>
      )}
    </div>
  );
};

export default PDFUpload;
