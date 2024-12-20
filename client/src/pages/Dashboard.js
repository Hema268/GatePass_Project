// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GatepassForm from '../components/GatepassForm/GatepassForm';
import { FaUser, FaSignOutAlt, FaList } from 'react-icons/fa'; // Icons for Admin, Logout, and List
import logo from './logo.png'; // Ensure you use the correct path for your logo

function Dashboard() {
  const navigate = useNavigate();
  const [gatepasses, setGatepasses] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('userRole') !== 'admin') {
      navigate('/');
    } else {
      fetchGatepasses();
    }
  }, [navigate]);

  const fetchGatepasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gatepass/list', { withCredentials: true });
      setGatepasses(response.data);
    } catch (error) {
      console.error("Error fetching gatepasses:", error);
    }
  };
  const handleLogout = () => {
    navigate('/'); // Redirect to Home.js
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white"> 
        <div className="flex items-center"> 
          <img src={logo} alt="Logo" className="h-10 mr-2" />
          <h1 className="text-2xl font-bold">Vivekanandha Educational Institutions</h1> 
        </div>

        {/* Admin with Icon & Logout Button in Header */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <FaUser className="text-base" />
            <span className="text-base font-semibold">Admin</span>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white py-1 px-2 rounded flex items-center"
          >
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        </div>
      </div>

      <div className="flex flex-grow">
        
        {/* Side Nav Bar */}
        <div className="w-1/5 bg-purple-800 text-white flex flex-col p-2">
          
          {/* Admin with Icon in Side Nav */}
          <div className="flex items-center mb-4 p-2 bg-purple-700 rounded-lg">
            <FaUser className="text-lg mr-1" />
            <h2 className="text-lg font-semibold">Admin</h2>
          </div>

          {/* Nav Items with List Icons */}
          <ul className="mt-4">
            <li>
              <button 
                className="w-full py-2 text-left text-base hover:bg-purple-700 rounded-lg flex items-center px-2"
                onClick={() => navigate('/dashboard')}
              >
                <FaList className="mr-2" /> Gatepass
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area: Full Width after Side Nav */}
        <div className="flex-grow p-2 flex">
          
        <div className="w-full bg-white p-3 rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold text-gray-800 mb-1">Gatepass</h1> {/* Increased text size and reduced margin */}
  <div className='m-0'><GatepassForm  onGatepassCreated={fetchGatepasses}/></div>
</div>

          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
