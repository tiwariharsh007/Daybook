import {createSlice} from "@reduxjs/toolkit";

const journalSlice = createSlice({
    name:"journal",
    initialState:{
        journal : [],
        likedJournals : [],
        currentDate : new Date().toLocaleDateString(),
    },
    reducers:{
        // multiple actions
        getJournal:(state,action)=>{
            state.journal = action.payload;
        },
        getLikedJournal:(state,action)=>{
            state.likedJournals = action.payload;
        },
        getCurrentDate:(state,action)=>{
            state.currentDate = action.payload;
        },
    }
});
export const {getJournal ,getLikedJournal, getCurrentDate} = journalSlice.actions;
export default journalSlice.reducer;

