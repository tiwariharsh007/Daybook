import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJournal } from "../redux/journalSlice.jsx";
import { JOURNAL_API_END_POINT } from "../utils/constant.js";

const useGetMyJournals = () => {
    const id = useSelector((state) => state?.user?.user?._id);
    const dispatch = useDispatch();

    const fetchMyJournals = async () => {
        try {
            const res = await axios.get(`${JOURNAL_API_END_POINT}/allJournals/${id}`, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            console.log(res);
            dispatch(getJournal(res?.data?.allJournals));
        } catch (error) {
            console.log(error);
            throw new Error("Failed to fetch journals");
        }
    };

    useEffect(() => {
        if (id) {
            fetchMyJournals();
        }
    }, [id]); // Add id as dependency

    return fetchMyJournals; // Return the function to be used externally
};

export default useGetMyJournals;