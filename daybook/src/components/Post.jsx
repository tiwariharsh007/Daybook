import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import useGetMyJournals from '../hooks/useGetAllJournal.jsx';
import Card from './Card.jsx';

const Post = () => {
    const navigate = useNavigate();
    const journal = useSelector(store => store?.journal?.journal);
    const user = useSelector((state) => state?.user?.user);

    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
      }, [user, navigate]);

    return (
        <div className='right hello'>
            {journal?.length > 0 ? (
                journal.map((item) => (
                    <Card key={item._id} item={item} />
                ))
            ) : (
                <p>No journals found.</p>
            )}
        </div>
    );
};

export default Post;
