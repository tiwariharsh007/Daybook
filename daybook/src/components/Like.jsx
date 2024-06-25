import React from 'react';
import { useSelector } from 'react-redux';
import useGetLikedJournals from '../hooks/useGetAllJournal.jsx';
import Card from './Card.jsx';

const Like = () => {
    const likedjournals = useSelector(store => store?.journal?.likedJournals);

    return (
        <div className='right hello'>
            {likedjournals?.length > 0 ? (
                likedjournals.map((item) => (
                    <Card key={item._id} item={item} />
                ))
            ) : (
                <p>No liked journals found.</p>
            )}
        </div>
    );
};

export default Like;
