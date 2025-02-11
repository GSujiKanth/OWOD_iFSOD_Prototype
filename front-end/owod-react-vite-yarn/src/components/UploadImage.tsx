import React, { useState} from 'react';
import './UploadImage.css';

const UploadImage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0])
        }
    };

    const handleUpload = () => {
        if(!selectedFile) {
            alert('Please select an image to upload.');
            return;
        }

        //perform upload logic here
        console.log('Uploading file:', selectedFile);
    };

    return (
        <div className="upload-container">
            <h1>Upload Image</h1>
            <input type="file" accept='image' onChange={handleFileChange}/>
            <button onClick={handleUpload} disabled={!selectedFile}>Upload
                
            </button>

            {/* {selectedFile && (
                <div>
                    <p>Selected file: {selectedFile.name}</p>
                </div>
            )} */}

        </div>
    );
};

export default UploadImage;