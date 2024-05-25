import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./page3.css"; // Import the CSS file

const Page3 = () => {
  const baseUri = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${baseUri}api/video/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video", error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="video-container">
      <h1>{video.title}</h1>
      <video controls autoPlay>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Page3;
