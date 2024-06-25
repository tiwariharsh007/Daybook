import { CgProfile } from "react-icons/cg";
import React from 'react';
import { useSelector } from "react-redux";
import store from "../redux/store";
const Navbar = () => {
  const {user} = useSelector(store=>store.user);
  return (
    <nav className="navbar hello">
            {/* Logo Section */}
      <div className="hello">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxmtiTTm0ACccmAhKopldevu61kEOu3EHSw&s" alt="Logo" className="logo"/>
        <span><h1>DΔYBOOK</h1></span>
      </div>
      {/* Profile Section */}
      <div class="dropdown profile">
      <button class="dropbtn hello">
        <CgProfile />
        <span>{user?.name}</span>
      </button>
      <div class="dropdown-content">
        <a href="/profile" >Profile</a>
        <a href="/settings" >Settings</a>
        <a href="/logout">Logout</a>
      </div>
      </div>
      
    </nav>
  );
}

export default Navbar;
