import React from 'react';

function ImageUploader({ onImageUpload }) {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onImageUpload(files);
  };

  return (
    <div className="uploader-container">
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="file-upload" className="custom-file-upload">
        Click to Upload Your Food Images
      </label>
    </div>
  );
}

export default ImageUploader;