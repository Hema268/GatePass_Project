
//src/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user._id;
    req.session.role = user.role;
    return res.json({ role: user.role });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
};
