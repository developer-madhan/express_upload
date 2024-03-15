import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProfileImageUpload() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully');
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });

      // Clear file input field after successful submission
      setFile(null);
      // Reset the file input field to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Swal.fire({
        icon: "error",
        title: "Oops..."+ error,
        text: "Something went wrong!",        
      });
    }
  };

  return (
    <div>
      <h2>Upload Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ProfileImageUpload;
