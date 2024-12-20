const express = require('express');
const router = express.Router();
const { saveGatePass, getGatePassList, deleteGatePassById } = require('../controllers/gatepassController');

// Route to save a new gate pass entry
router.post('/', saveGatePass);

// Route to retrieve the list of gate pass entries
router.get('/', getGatePassList);

// Route to delete a specific gate pass entry by ID
router.delete('/:id', deleteGatePassById);

module.exports = router;
