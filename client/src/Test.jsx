import React, { useState } from 'react';

const Test = () => {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(e.target.files)
        if (selectedFile) {
            setImage(URL.createObjectURL(selectedFile)); 
            console.log(URL.createObjectURL(selectedFile))
            
            setFileName(selectedFile.name); // Show filename
        }
    };

    const handleUploadClick = () => {
        document.getElementById('imageInput').click();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Hidden Image Input (Only accepts images) */}
            <input
                id="imageInput"
                type="file"
                accept="image/*" // Only images
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Custom Upload Button */}
            <button
                onClick={handleUploadClick}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md cursor-pointer"
            >
                Upload Image
            </button>

            {/* Display Selected File Name */}
            {fileName && <p className="text-gray-700">Selected: {fileName}</p>}

            {/* Show Image Preview */}
            {image && (
                <div className="mt-3">
                    <img src={image} alt="Preview" className="w-40 h-40 object-cover rounded-lg border" />
                </div>
            )}
        </div>
    );
};

export default Test;
