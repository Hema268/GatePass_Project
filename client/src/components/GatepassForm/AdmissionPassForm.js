//src/components/GatepassForm/AdmissionPassForm.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function AdmissionPassForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    type: 'Admission Pass',
    date: '',
    name: '',
    college: '',
    department: '',
    admissionYear: '',
    contact: '',
    maleCount: '',
    femaleCount: '',
    referenceType: '',
    referenceDetail: '',
    outgoingTime: '',
    twelfthMarkPercentage: '',
    cutoffMark: '',
    photo: null,
  });

  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  //const [showSlip, setShowSlip] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    // Call onSubmit function with formData
    onSubmit(formData);
    
    // Attempt to save the data to the backend
    try {
      await axios.post('http://localhost:5000/api/gatepass', formData);
      alert('Gatepass saved successfully!');
    } catch (error) {
      console.error('Error saving gatepass:', error.response?.data || error.message);
      alert('Failed to save gatepass, but printing will proceed.');
    }
  
    // Print the gate pass slip regardless of the save result
    printGatepass();
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setFormData({ ...formData, photo: imageSrc });
  };

  const printGatepass = () => {
    const printWindow = window.open('', '_blank');
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Admission Gate Pass</title>
          <style>
            @media print {
              @page {
                size: A6;
                margin: 10mm;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              .container {
                padding: 10px;
                width: 100%;
                box-sizing: border-box;
                border: 2px solid #000;
                border-radius: 8px;
              }
              .header {
                text-align: center;
                border-bottom: 1px solid #000;
                padding-bottom: 10px;
                margin-bottom: 10px;
              }
              .content {
                display: grid;
                grid-template-columns: auto 120px;
                gap: 10px;
                margin-bottom: 10px;
              }
              .table {
                width: 100%;
                border-collapse: collapse;
              }
              .table td, .table th {
                border: 1px solid #000;
                padding: 5px;
                text-align: left;
                vertical-align: top;
              }
              .photo {
                width: 120px;
                height: auto;
                border: 1px solid #000;
                padding: 5px;
                border-radius: 5px;
                align-self: start;
                margin-bottom: 10px;
              }
              .footer {
                text-align: center;
                border-top: 1px solid #000;
                padding-top: 10px;
                margin-top: 10px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vivekanandha Educational Institutions</h1>
              <h2>Admission Gate Pass</h2>
            </div>
            <div class="content">
              <table class="table">
                <tr>
                  <td><strong>Date:</strong></td>
                  <td>${formData.date}</td>
                </tr>
                <tr>
                  <td><strong>Student Name:</strong></td>
                  <td>${formData.name}</td>
                </tr>
                <tr>
                  <td><strong>College:</strong></td>
                  <td>${formData.college}</td>
                </tr>
                <tr>
                  <td><strong>Contact Number:</strong></td>
                  <td>${formData.contact}</td>
                </tr>
                <tr>
                  <td><strong>Coming From:</strong></td>
                  <td>${formData.comingFrom}</td>
                </tr>
                <tr>
                  <td><strong>Vehicle Number:</strong></td>
                  <td>${formData.vehicle}</td>
                </tr>
                <tr>
                  <td><strong>Male Count:</strong></td>
                  <td>${formData.maleCount}</td>
                </tr>
                <tr>
                  <td><strong>Female Count:</strong></td>
                  <td>${formData.femaleCount}</td>
                </tr>
              </table>
              ${formData.photo ? `<img src="${formData.photo}" class="photo" alt="Captured" />` : ''}
            </div>
            <div class="footer">
              <p class="text-sm font-semibold">Signature of Security Officer</p>
              <p class="italic">The admission gate pass is valid for campus exit only</p>
            </div>
          </div>
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.print();
  };
  
  
  

  return (
    <div className="flex justify-between">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-3/4 space-y-4">
        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Student Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">College</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300"
            required
          />
        </div>


        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Contact Number</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="block text-base font-semibold text-gray-600 w-1/3">Coming From</label>
          <input
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300"
            type="text"
            name="comingFrom"
            value={formData.comingFrom}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center">
          <label className="block text-base font-semibold text-gray-600 w-1/3">Vehicle Number</label>
          <input
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300"
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center">
          <label className="block text-base font-semibold text-gray-600 w-1/3">Security Verified By</label>
          <input
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300"
            type="text"
            name="securityVerifiedBy"
            value={formData.securityVerifiedBy}
            onChange={handleChange}
          />
        </div>

        {/* Align Male and Female Count in a single row */}
        <div className="flex items-center">
          <label className="block text-base font-semibold text-gray-600 w-1/3">Male Count</label>
          <input
            className="w-1/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300 mr-2"
            type="number"
            name="maleCount"
            value={formData.maleCount}
            onChange={handleChange}
          />
          <label className="block text-base font-semibold text-gray-600 w-1/3">Female Count</label>
          <input
            className="w-1/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 transition duration-300"
            type="number"
            name="femaleCount"
            value={formData.femaleCount}
            onChange={handleChange}
          />
        </div>


        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-lg shadow-lg"
        >
          Generate Gatepass Slip
        </button>
      </form>

      {/* Webcam Section */}
      <div className="w-1/4 flex flex-col justify-start items-end pr-2 pt-2">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Take Photo</h2>
        
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-48 mb-4 rounded-lg border"
          />

          <button
            onClick={capturePhoto}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4"
          >
            Capture Photo
          </button>

          {photo && (
            <div>
              <h3 className="font-bold text-gray-700 mb-2">Captured Photo:</h3>
              <img src={photo} alt="Captured" className="w-full h-48 object-cover rounded-lg border" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdmissionPassForm;
