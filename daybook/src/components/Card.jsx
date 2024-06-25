import React from 'react';
import { IoIosHeartEmpty } from "react-icons/io";
import axios from 'axios';
import { JOURNAL_API_END_POINT } from '../utils/constant.js';
import useGetMyJournals from '../hooks/useGetAllJournal.jsx';
import useGetLikedJournals from '../hooks/useGetLikedJournals.jsx';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Card = ({ item }) => { 
  const navigate = useNavigate();
  const fetchJournals = useGetMyJournals();
  const fetchMyLikedJournals = useGetLikedJournals();

  const handleDiscard = async () => {
    try {
      const res = await axios.delete(`${JOURNAL_API_END_POINT}/delete/${item?._id}`, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      console.log(res);
      if (res?.data?.success) {
        fetchJournals();
        navigate("/post");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message); // Changed to toast.error
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.put(`${JOURNAL_API_END_POINT}/like/${item?._id}`,{}, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      console.log(res);
      if (res?.data?.success) {
        fetchMyLikedJournals();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message); // Changed to toast.error
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-date">{item?.date}</span>
        <button onClick={handleLike} className="card-like-button">
          <IoIosHeartEmpty />
        </button>
        <button onClick={handleDiscard} className="card-delete-button">Delete</button> {/* Removed quotes */}
      </div>
      <img src={item?.image} alt="img" className="card-image" /> {/* Removed quotes around item?.image */}
      <div className="card-body">
        <h3 className="card-title">{item?.title}</h3>
        <p className="card-text">{item?.description}</p>
      </div>
    </div>
  );
};

export default Card;
