import React, { useState } from 'react';
import VisitorPassForm from './VisitorPassForm';
import AdmissionPassForm from './AdmissionPassForm';
import MaterialInPassForm from './MaterialInPassForm';
import MaterialOutPassForm from './MaterialOutPassForm';

function GatepassForm() {
  const [gatepassType, setGatepassType] = useState('');

  const handleSubmit = (formData) => {
    // Handle submission logic here
  };

  return (
    <div className="mt-12">
      {/* Gatepass Type Selection */}
      <div className="flex items-center text-lg font-semibold text-gray-700 mb-6 space-x-8">
        <label htmlFor="gatepassType" className="mr-8">Gatepass Type</label>
        <select
          id="gatepassType"
          className="w-1/2 p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          name="gatepassType"
          value={gatepassType}
          onChange={(e) => setGatepassType(e.target.value)}
        >
          <option value="">--Select Gatepass Type--</option>
          <option value="visitor">Visitor Pass</option>
          <option value="admission">Admission Pass</option>
          <option value="material-in">Material In Pass</option>
          <option value="material-out">Material Out Pass</option>
        </select>
      </div>

      {/* Render the appropriate form based on selection */}
      {gatepassType === 'visitor' && <VisitorPassForm onSubmit={handleSubmit} />}
      {gatepassType === 'admission' && <AdmissionPassForm onSubmit={handleSubmit} />}
      {gatepassType === 'material-in' && <MaterialInPassForm onSubmit={handleSubmit} />}
      {gatepassType === 'material-out' && <MaterialOutPassForm onSubmit={handleSubmit} />}
    </div>
  );
}

export default GatepassForm;
