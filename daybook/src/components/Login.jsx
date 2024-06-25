// src/components/AuthForm.js
import React, { useState } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getUser } from '../redux/userSlice.jsx';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic here
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        });
        dispatch(getUser(res?.data?.user));

        if(res?.data?.success){
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error?.response?.data?.message);
        console.log(error);
      }
    } else {
      // Handle signup logic here
      // signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        if(res.data.success){
          setIsLogin(true);

          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.success(error?.response?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="auth-form">
      <h1>{isLogin ? 'LOGIN' : 'SIGN UP'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={handleToggle}>
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default Login;
