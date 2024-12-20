const GatePass = require('../models/GatePass'); // Model for gate pass entries

// Controller function to save gate pass entry
exports.saveGatePass = async (req, res) => {
  try {
    const newGatePass = new GatePass(req.body);
    await newGatePass.save();
    res.status(201).json(newGatePass); // Send the saved entry back as response
  } catch (error) {
    console.error('Error saving gatepass:', error.message || error);
    res.status(500).json({ message: 'Failed to save gatepass' });
  }
};

// Controller function to retrieve gate pass list
exports.getGatePassList = async (req, res) => {
  try {
    const gatePassList = await GatePass.find(); // Fetch all entries
    res.status(200).json(gatePassList);
  } catch (error) {
    console.error('Error retrieving gate pass list:', error.message || error);
    res.status(500).json({ message: 'Failed to retrieve gate pass list' });
  }
};

// Controller function to delete a gate pass entry by ID
exports.deleteGatePassById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGatePass = await GatePass.findByIdAndDelete(id);
    if (!deletedGatePass) {
      return res.status(404).json({ message: 'Gate pass not found' });
    }
    res.status(200).json({ message: 'Gate pass deleted successfully', deletedGatePass });
  } catch (error) {
    console.error('Error deleting gatepass:', error.message || error);
    res.status(500).json({ message: 'Failed to delete gate pass' });
  }
};
