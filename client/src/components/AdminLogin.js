// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../pages/logo.png';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.role === 'admin') {
        sessionStorage.setItem('userRole', 'admin');
        navigate('/dashboard');
      } else if (response.data.role === 'superadmin') {
        sessionStorage.setItem('userRole', 'superadmin');
        navigate('/super-admin-dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-700">
      <form 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-sm md:max-w-lg lg:max-w-xl"
        onSubmit={handleLogin}
      > 
        {/* Logo with Heading VIVEKANANDHA COLLEGE OG ENGINNERING FOR WOMEN */}
    <div className="flex items-center justify-center">
      <img src={logo} alt="Logo" className="h-10 mr-2" />
      <h1 className="text-xl font-bold">VIVEKANANDHA EDUCATIONAL INSTITUTIONS</h1>
    </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <input
          className="w-full p-3 mb-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition-all duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
