import React, { useState } from 'react';
import './UploadImage.css';

// Keep the interface for the expected API response structure
interface PredictionResult {
    predicted_class_index: number;
    max_probability: number;
    is_ood: boolean;
    ood_status: 'Out-of-Distribution (OOD)' | 'In-Distribution (ID)';
}

const UploadImage: React.FC = () => {
    // --- State Variables ---
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // --- IMPORTANT: Paste the ngrok public URL from Colab output below ---
    const COLAB_BACKEND_URL = "https://b6ca-35-198-199-123.ngrok-free.app/predict"; // ngrok URL

    // --- Event Handler for File Input Change ---
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Reset state for new upload attempt
        setError(null);
        setResult(null);
        setImagePreview(null);
        setSelectedFile(null);

        const file = event.target.files?.[0];

        if (file) {
            setSelectedFile(file); // Store file object

            // Generate Image Preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Trigger API Upload immediately after selection
            uploadImage(file);
        }
         // Reset the input value so the same file can be selected again
         if (event.target) {
            event.target.value = '';
        }
    };

    // --- Function to Handle the Upload and API Call (same as before) ---
    const uploadImage = (file: File) => {
        setIsLoading(true);
        setError(null);
        // result won't be clear here, keep previous result visible until new one arrives or error occurs
        // setResult(null);

        const formData = new FormData();
        formData.append('image', file);

        fetch(COLAB_BACKEND_URL, {
            method: 'POST',
            body: formData,
        })
        .then(async response => {
            if (!response.ok) {
                let errorMessage = `Network response was not ok: ${response.statusText} (Status: ${response.status})`;
                try {
                    const errData = await response.json();
                    errorMessage += `. Server error: ${errData.error || 'Unknown error structure'}`;
                } catch (parseError) {
                    console.error("Could not parse error response JSON:", parseError);
                }
                throw new Error(errorMessage);
            }
            return response.json();
        })
        .then((data: PredictionResult) => {
            console.log('Success:', data);
            setResult(data); // Update result state
            setError(null); // Clear any previous error on success
        })
        .catch(error => {
            console.error('Error:', error);
            setError(`Error during prediction: ${error.message}`);
            // Clear preview and result on error
            // setImagePreview(null); // Keep preview maybe? User choice. Let's keep it for now.
            setResult(null);
        })
        .finally(() => {
            setIsLoading(false); // Stop loading indicator
        });
    };

    // --- Render the Component ---
    return (
        // Container specific to this component's content
        <div className="upload-container">
            {/* Title for this section */}
            <h1>Upload Image for OOD Check</h1>
            <p>Select an image file using the button below.</p>

            {/* --- Upload Section --- */}
            <div className="upload-section">
                {/* The visible file input trigger */}
                <label htmlFor="imageUpload" className="upload-label-button">
                    Choose Image...
                </label>
                <input
                    type="file"
                    id="imageUpload" // ID matches the label's htmlFor
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Hide the default input appearance
                />

                {/* Display file name if selected (optional but good UX) */}
                {selectedFile && !isLoading && <span className="file-name">Selected: {selectedFile.name}</span>}

                 {/* Loading Spinner - Show only when loading */}
                 {isLoading && <div className="spinner small-spinner"></div>}
            </div>


            {/* --- Display Area for Preview and Results --- */}
            {/* Show this area only if there's a preview, result, or error */}
            {(imagePreview || result || error) && !isLoading && (
                <div className="display-area">

                    {/* Error Display */}
                    {error && <div className="error-text">{error}</div>}

                    {/* Image Preview */}
                    {imagePreview && !error && (
                        <div className="preview-section">
                            <h2>Preview:</h2>
                            <img
                                src={imagePreview}
                                alt="Selected Preview"
                                className="image-preview"
                            />
                        </div>
                    )}

                    {/* Prediction Results */}
                    {result && !error && (
                        <div className="result-section">
                            <h2>Result:</h2>
                            <div className="result-text">
                                Predicted Known Class Index: {result.predicted_class_index}<br />
                                Max Probability (Confidence): {result.max_probability.toFixed(4)}<br />
                                Status: <span className={result.is_ood ? 'ood' : 'id'}>{result.ood_status}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Initial placeholder message */}
            {!isLoading && !imagePreview && !result && !error && (
                 <div className="placeholder-text">Preview and results will appear here after upload.</div>
            )}

            {/* Optional Note */}
            {/* <p><small>Note: Prediction occurs via backend API.</small></p> */}
        </div>
    );
};

export default UploadImage;