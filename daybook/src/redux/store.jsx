import {configureStore,combineReducers} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import journalReducer from './journalSlice';

const store = configureStore({
    reducer:{
        user : userReducer,
        journal : journalReducer,
    }
});
export default store;