import React, { useRef, useState } from 'react';
import { Upload, X, Loader2, FileText, Image as ImageIcon } from 'lucide-react';

const FileUpload = ({ handleFileUpload, formData }) => {
  const fileInputRef = useRef(null);
  const maxSize = 10 * 1024 * 1024; // 10MB
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const validateAndUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    
    // Validate file size
    const invalidFiles = files.filter(file => file.size > maxSize);
    if (invalidFiles.length > 0) {
      alert('Some files are larger than 10MB. Please select smaller files.');
      return;
    }

    setIsUploading(true);
    try {
      await handleFileUpload(files, formData.attachments);
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (urlToRemove) => {
    const updatedAttachments = formData.attachments.filter(url => url !== urlToRemove);
    handleFileUpload([], updatedAttachments);
  };

  const getFileIcon = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return <ImageIcon className="w-5 h-5" />;
    }
    return <FileText className="w-5 h-5" />;
  };

  const getFileName = (url) => {
    return url.split('/').pop().split('_').slice(1).join('_');
  };

  return (
    <div className="mb-6 space-y-4">
      <p className="text-sm font-medium text-gray-700 mb-1">
        Attach Photos or Videos <span className="text-gray-500">(Optional)</span>
      </p>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-center text-gray-600">
            Select a file or drag and drop here
          </p>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG or PDF, file size no more than 10MB
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={validateAndUpload}
          accept="image/*,application/pdf"
          multiple
        />
      </div>

      {/* Upload Progress Indicator */}
      {isUploading && (
        <div className="flex items-center justify-center p-2 bg-gray-50 rounded-md">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span className="text-sm text-gray-600">Uploading files...</span>
        </div>
      )}

      {/* Uploaded Files Preview */}
      {formData.attachments.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
          <div className="space-y-2">
            {formData.attachments.map((url, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md group"
              >
                <div className="flex items-center space-x-2">
                  {getFileIcon(url)}
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {getFileName(url)}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(url);
                  }}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;