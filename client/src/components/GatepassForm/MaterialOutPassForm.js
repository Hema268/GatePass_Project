//src/components/GatepassForm/MaterialOutPassForm.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function MaterialOutPassForm() {
  const [formData, setFormData] = useState({
    type: 'Material-out Pass',
    date: '',
    nameOfCompany: '',
    vehicle: '',
    contact: '',
    toPlace: '',
    name: '',
    securityVerifiedBy: '',
    comingFrom: '', // New field
    approvedBy: '', // New field
    department: '', // New field
    photo: null,
  });

  const [tableData, setTableData] = useState([{ description: '', quantity: '', billNo: '', billDate: '', status: '' }]);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTableChange = (e, index) => {
    const { name, value } = e.target;
    const newTableData = [...tableData];
    newTableData[index][name] = value;
    setTableData(newTableData);
  };

  const addTableRow = () => {
    setTableData([...tableData, { description: '', quantity: '', billNo: '', billDate: '', status: '' }]);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, photo: imageSrc });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

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

  const printGatepass = () => {
    const printWindow = window.open('', '_blank');
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Material Gate Pass</title>
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
                border: 2px solid black;
                padding: 15px;
                border-radius: 8px;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
                font-weight: bold;
                border-bottom: 2px solid black;
                padding-bottom: 10px;
              }
              .grid-container {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 10px;
                margin-bottom: 10px;
                border-bottom: 2px solid black;
                padding-bottom: 10px;
                align-items: start;
              }
              .fields-column {
                display: flex;
                flex-direction: column;
                gap: 5px;
                border-right: 2px solid black;
                padding-right: 10px;
              }
              .photo {
                width: 150px;
                height: auto;
                border: 2px solid black;
                padding: 5px;
                border-radius: 5px;
                align-self: start;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                border: 2px solid black;
                border-radius: 5px;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
              .footer {
                margin-top: 20px;
                font-weight: bold;
                border-top: 2px solid black;
                padding-top: 10px;
                text-align: center;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vivekanandha Educational Institutions</h1>
              <h2>Material Gate Pass</h2>
            </div>
            <div class="grid-container">
              <div class="fields-column">
                <div><strong>Date:</strong> ${formData.date}</div>
                <div><strong>Name of Company:</strong> ${formData.nameOfCompany}</div>
                <div><strong>Person Name:</strong> ${formData.name}</div>
                <div><strong>Vehicle No:</strong> ${formData.vehicle}</div>
                <div><strong>Phone No:</strong> ${formData.contact}</div>
                <div><strong>To Place:</strong> ${formData.toPlace}</div>
                <div><strong>Security Verified By:</strong> ${formData.securityVerifiedBy}</div>
                <div><strong>Coming From:</strong> ${formData.comingFrom}</div>
                <div><strong>Approved By:</strong> ${formData.approvedBy}</div>
                <div><strong>Department/College:</strong> ${formData.department}</div>
              </div>
              ${formData.photo ? `<img src="${formData.photo}" class="photo" alt="Captured" />` : ''}
            </div>
            <hr/>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Bill No</th>
                  <th>Bill Date</th>
                  <th>Status of Bill</th>
                </tr>
              </thead>
              <tbody>
                ${tableData.map((row, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${row.description}</td>
                    <td>${row.quantity}</td>
                    <td>${row.billNo}</td>
                    <td>${row.billDate}</td>
                    <td>${row.status}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <hr/>
            <div class="footer">
              <p>Verified Sign</p>
            </div>
          </div>
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();
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
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>
        
        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Name of Company</label>
          <input
            type="text"
            name="nameOfCompany"
            value={formData.nameOfCompany}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Person Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Vehicle No</label>
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Phone No</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Destination</label>
          <input
            type="text"
            name="toPlace"
            value={formData.toPlace}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Security Verified By</label>
          <input
            type="text"
            name="securityVerifiedBy"
            value={formData.securityVerifiedBy}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        {/* New Fields */}
        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Coming From</label>
          <input
            type="text"
            name="comingFrom"
            value={formData.comingFrom}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Approved By</label>
          <input
            type="text"
            name="approvedBy"
            value={formData.approvedBy}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-base font-semibold text-gray-600">Department/College</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-2/3 p-2 border-0 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </div>

        

        {/* Material Information Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Material Information</h3>
          {tableData.map((row, index) => (
            <div key={index} className="grid grid-cols-5 gap-6 mb-4">
              <div>
                <label className="block text-lg font-semibold text-gray-600">Description</label>
                <input
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  type="text"
                  name="description"
                  value={row.description}
                  onChange={(e) => handleTableChange(e, index)}
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-600">Quantity</label>
                <input
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  type="number"
                  name="quantity"
                  value={row.quantity}
                  onChange={(e) => handleTableChange(e, index)}
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-600">Bill No</label>
                <input
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  type="text"
                  name="billNo"
                  value={row.billNo}
                  onChange={(e) => handleTableChange(e, index)}
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-600">Bill Date</label>
                <input
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  type="date"
                  name="billDate"
                  value={row.billDate}
                  onChange={(e) => handleTableChange(e, index)}
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-600">Status of Bill</label>
                <select
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  name="status"
                  value={row.status}
                  onChange={(e) => handleTableChange(e, index)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTableRow}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg"
          >
            Add Another Row
          </button>
        </div>

        <button
          type="submit"
          className="mt-8 px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg"
        >
          Generate Gate Pass
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

          {formData.photo && (
            <div>
              <h3 className="font-bold text-gray-700 mb-2">Captured Photo:</h3>
              <img src={formData.photo} alt="Captured" className="w-full h-48 object-cover rounded-lg border" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MaterialOutPassForm;
