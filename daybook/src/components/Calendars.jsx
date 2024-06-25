import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useDispatch} from "react-redux";
import journalSlice, { getCurrentDate } from '../redux/journalSlice.jsx';
import { useSelector } from "react-redux";
import store from "../redux/store";

const Calendars = () => {
  const dispatch = useDispatch();
  const {journal} = useSelector(store=>store.journal);
  const [selectedDate, setSelectedDate] = useState(new Date());

  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    
  };
  useEffect(() => {
    dispatch(getCurrentDate(selectedDate.toLocaleDateString()));
  }, [selectedDate, dispatch]);
  return (
    <div>
      <Calendar  onChange={handleDateChange} value={selectedDate} />
      {selectedDate && (
        <div>
          <p>Selected Date: {selectedDate.toDateString()}</p>
        </div>
      )}
    </div>
  )
}

export default Calendars