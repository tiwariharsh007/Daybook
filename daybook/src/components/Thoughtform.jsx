import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JOURNAL_API_END_POINT } from "../utils/constant.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ThoughtForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState("");
  const [imgupload, setImgupload] = useState("");
  const currentDate = useSelector((state) => state.journal.currentDate);
  const id = useSelector((state) => state?.user?.user?._id);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleDiscard = () => {
    setTitle('');
    setDescription('');
    setImage("");
  };

  const submitImage = async () => {
    if (!image) {
      console.error("No image selected");
      return;
    }
  
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Daybook"); // Ensure this preset exists in your Cloudinary account
    data.append("cloud_name", "dttqjvfqj"); // This should not be needed in the form data
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dttqjvfqj/image/upload", {
        method: "POST",
        body: data
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log(result.url);
      setImgupload(result.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  const handleDone = async () => {

    try {
      const res = await axios.post(`${JOURNAL_API_END_POINT}/create`, { title , description , id , date : currentDate , image : imgupload}, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      }); 
      if(res.data.success){
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.success(error?.response?.data?.message);
      navigate("/login");
      console.log(error);
    }
    handleDiscard();
  };

  return (
    <div className="thought-form">
      <div className="date">{currentDate}</div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <textarea
        placeholder="Your description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="description-textarea"
      />
      <input type='file' onChange={(e) => setImage(e.target.files[0])}/>
      <button onClick={submitImage}  className="button image-button" >Add Image</button>
      <div className="buttons">
        <button onClick={handleDiscard} className="button discard-button">Discard</button>
        <button onClick={handleDone} className="button done-button">Done</button>
      </div>
    </div>
  );
};

export default ThoughtForm;
