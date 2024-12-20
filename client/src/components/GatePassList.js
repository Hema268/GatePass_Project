import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaList, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import logo from '../pages/logo.png';

function GatePassList() {
  const navigate = useNavigate();
  const [gatePasses, setGatePasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/gatepass')  // Ensure the endpoint is correct
      .then((response) => {
        console.log('Gatepass data:', response.data);  // Log to confirm data structure
        setGatePasses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching gate pass data:', error);
        setLoading(false);
      });
  }, []);
  

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-2" />
          <h1 className="text-2xl font-bold">Vivekanandha Educational Institutions</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <FaUser className="text-base" />
            <span className="text-base font-semibold">Super Admin</span>
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
          <div className="flex items-center mb-4 p-2 bg-purple-700 rounded-lg">
            <FaUser className="text-lg mr-1" />
            <h2 className="text-lg font-semibold">Super Admin</h2>
          </div>

          <ul className="mt-4">
            <li>
              <button
                className="w-full py-2 text-left text-base hover:bg-purple-700 rounded-lg flex items-center px-2"
                onClick={() => navigate('/super-admin-dashboard')}
              >
                <FaList className="mr-2" /> Gatepass
              </button>
            </li>
            <li>
              <button
                className="w-full py-2 text-left text-base hover:bg-purple-700 rounded-lg flex items-center px-2"
                onClick={() => navigate('/gatepass-list')}
              >
                <FaClipboardList className="mr-2" /> Gate Pass List
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Gate Pass List</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="p-3 border-b-2">S. No</th>
                    <th className="p-3 border-b-2">GatePass Type</th>
                    <th className="p-3 border-b-2">Name</th>
                    <th className="p-3 border-b-2">Contact Number</th>
                    <th className="p-3 border-b-2">Vehicle Number</th>
                    <th className="p-3 border-b-2">Security Verified by</th>
                    <th className="p-3 border-b-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {gatePasses.map((pass, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{pass.type}</td>
                      <td className="p-3">{pass.name}</td>
                      <td className="p-3">{pass.contact}</td>
                      <td className="p-3">{pass.vehicle}</td>
                      <td className="p-3">{pass.securityVerifiedBy}</td>
                      <td className="p-3">{new Date(pass.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GatePassList;
