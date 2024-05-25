import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./page2.css"; // Import CSS for styling

const Page2 = () => {
  const baseUri = process.env.REACT_APP_API_URL;
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State variable to track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseUri}api/video`);
        setVideos(response.data);
        setIsLoading(false); // Update loading state when data is fetched
      } catch (error) {
        console.error("Error fetching videos", error);
        setIsLoading(false); // Update loading state if there's an error
      }
    };

    fetchVideos();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/video/${id}`);
  };

  if (isLoading) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  return (
    <div className="video-list">
      {videos.map((video) => (
        <div
          key={video._id}
          className="video-item"
          onClick={() => handleItemClick(video._id)}
        >
          <h3 className="video-title">{video.title}</h3>
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="video-thumbnail"
          />
        </div>
      ))}
    </div>
  );
};

export default Page2;
