import React, { useState } from "react";
import axios from "axios";
import "./page1.css";
import { useNavigate } from "react-router-dom";
const Page1 = () => {
  const baseUri = process.env.REACT_APP_API_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const validateFileFormat = (file, allowedFormats) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedFormats.includes(fileExtension);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (title.length > 50) {
      newErrors.title = "Title must be 50 characters or less.";
    }
    if (description.length > 200) {
      newErrors.description = "Description must be 200 characters or less.";
    }
    if (thumbnail && !validateFileFormat(thumbnail, ["jpg", "png"])) {
      newErrors.thumbnail = "Thumbnail must be in JPG or PNG format.";
    }
    if (video && !validateFileFormat(video, ["mpg", "avi", "mp4"])) {
      newErrors.video = "Video must be in MPG, AVI, or MP4 format.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);

    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post(`${baseUri}api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("upload successful", response);
      navigate("/thumbnail");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength="50"
          required
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="200"
          required
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
      </div>
      <div>
        <label>Upload Thumbnail (JPG, PNG)</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required
        />
        {errors.thumbnail && <p style={{ color: "red" }}>{errors.thumbnail}</p>}
      </div>
      <div>
        <label>Upload Video (MPG, AVI, MP4)</label>
        <input
          type="file"
          accept="video/mpeg, video/avi, video/mp4"
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />
        {errors.video && <p style={{ color: "red" }}>{errors.video}</p>}
      </div>
      <button type="submit" disabled={loading}>
        {" "}
        {/* Disable button when loading */}
        {loading ? " " : "Upload"} {/* Change button text when loading */}
      </button>
    </form>
  );
};

export default Page1;
