import React, { useState } from "react";
import axios from "axios";
import "./ImageURLAndImageUploader.css";

const ImageFromURL = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const classifyByUrl = async () => {
    if (!imageUrl) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/carsimageurl", // Update this URL
        { imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
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
    <div className="CarImageURL">
      <div>
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={classifyByUrl}>Classify</button>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : result ? (
          <>
            <img src={imageUrl} alt="Classified" width="300" />
            {result.predictions.map((item, index) => (
              <p key={index}>
                {item.tagName}: {Math.round(item.probability * 100)}%
              </p>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ImageFromURL;
