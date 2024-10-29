import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ handleFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log("clicked");
    }
  };

  const onFileUpload = (event) => {
    console.log("working");

    const file = event.target.files[0]; // Get the single file selected
    console.log("File selected:", file);
    if (file) {
      handleFileUpload([file]); // Send a single file wrapped in an array
    }
    
    // Clear input value to allow re-selection of the same file
    fileInputRef.current.value = null;
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Attach a Photo or Video (Optional)
      </label>
      <div className="flex items-center justify-center w-full">
        <div
          onClick={handleClick}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={onFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
