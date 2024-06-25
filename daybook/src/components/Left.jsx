import React, { useState, useEffect } from 'react';
import Calendars from './Calendars';
import { IoMdHome } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiStackSimple } from "react-icons/pi";
import useGetMyJournals from '../hooks/useGetAllJournal.jsx';
import useGetLikedJournals from '../hooks/useGetLikedJournals.jsx';
import { useNavigate } from "react-router-dom";

const Left = () => {
    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState(false);
    const fetchJournals = useGetMyJournals(); // Call the hook here to get the fetch function
    const fetchMyLikedJournals = useGetLikedJournals();

    const handleClick1 = () => {
        setIsSelected(!isSelected);
        
        // Assume useGetMyJournals returns the fetch function
        try {
            fetchJournals(); // Call the fetch function directly
            navigate("/");
        } catch (error) {
            console.error("Failed to fetch journals:", error);
            // Handle the error accordingly
        }
    };
    const handleClick4 = () => {
        setIsSelected(!isSelected);
        
        // Assume useGetMyJournals returns the fetch function
        try {
            fetchJournals(); // Call the fetch function directly
            navigate("/post");
        } catch (error) {
            console.error("Failed to fetch journals:", error);
            // Handle the error accordingly
        }
    };
    const handleClick3 = () => {
        setIsSelected(!isSelected);
        
        // Assume useGetMyJournals returns the fetch function
        try {
            fetchMyLikedJournals(); // Call the fetch function directly
            navigate("/like");
        } catch (error) {
            console.error("Failed to fetch liked journals:", error);
            // Handle the error accordingly
        }
    };

    return (
        <div className='left'>
            <div className='hello'>
                <button className={isSelected ? 'bar selected' : 'bar'} onClick={handleClick1}><IoMdHome /></button>
                <button className={isSelected ? 'bar selected' : 'bar'} onClick={""}><IoIosSearch /></button>
                <button className={isSelected ? 'bar selected liked' : 'bar'} onClick={handleClick3}><IoIosHeartEmpty /></button>
                <button className={isSelected ? 'bar selected' : 'bar'} onClick={handleClick4}><PiStackSimple /></button>
            </div>
            <Calendars />
        </div>
    );
};

export default Left;
