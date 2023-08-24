import React, { useState } from "react";
import axios from "axios";
import "./ImageURLAndImageUploader.css";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0])); // Show the uploaded image
  };

  const classifyByUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/classifyuploadimage", // Update this URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="ImageUploader">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={classifyByUpload}>Classify by Upload</button>
      </div>
      <div>
        {imageUrl && <img src={imageUrl} alt="Uploaded" width="300" />}
        {result && (
          <div>
            {result.predictions.map((item, index) => (
              <p key={index}>
                {item.tagName}: {Math.round(item.probability * 100)}%
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
