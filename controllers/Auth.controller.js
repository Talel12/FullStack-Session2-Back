const User = require("../models/User.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ message: "User already exists" });

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({ ...req.body, password: hashedPassword });
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: "bad credentials" });

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, "secret");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserProfile(req, res) {
    try {
        console.log(req.headers.authorization)
        if (!req.headers.authorization ||!req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, "secret");
        console.log("🚀 ~ getUserProfile ~ decoded:", decoded)
        if (!decoded) return res.status(401).json({ message: 'Token is not valid' });
        
      const user = await User.findById(decoded.id).select("-password");
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
