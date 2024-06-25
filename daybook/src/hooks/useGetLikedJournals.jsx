
import axios from "axios";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedJournal } from "../redux/journalSlice.jsx";
import { JOURNAL_API_END_POINT } from "../utils/constant.js";

const useGetLikedJournals = () => {
    const [refresh, setRefresh] = useState(false);
    
    const id = useSelector((state) => state?.user?.user?._id);
    const likedjournals = useSelector(store => store?.journal?.likedJournals);
    const dispatch = useDispatch();

    const fetchMyLikedJournals = async () => {
        setRefresh(!refresh);
        try {
            const res = await axios.get(`${JOURNAL_API_END_POINT}/likedJournals/${id}`, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            console.log(res);
            dispatch(getLikedJournal(res?.data?.likedJournals));
        } catch (error) {
            console.log(error);
            throw new Error("Failed to fetch liked journals");
        }
    };

    useEffect(() => {
        if (id) {
            fetchMyLikedJournals();
        }
    }, [likedjournals.length]); // Add id as dependency

    return fetchMyLikedJournals; // Return the function to be used externally
};

export default useGetLikedJournals;
