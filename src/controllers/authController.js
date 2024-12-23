// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// // Register user
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//   });

//   if (user) {
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.status(201).json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       token,
//     });
//   } else {
//     res.status(400).json({ message: "Invalid user data" });
//   }
// };

// // Login user
// const authUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       token,
//     });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// };

// module.exports = { registerUser, authUser };

require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log("JWT Secret Key:", process.env.JWT_SECRET);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
    console.log("JWT Secret Key:", process.env.JWT_SECRET);
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await user.findOne({ email });
        if(!User) return res.status(404).json({ message: 'User not found'});

        const isMatch = await bcrypt.compare( password, user.password );
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: 'id' });
        res.status(201).jso({ message: 'User logged in successfully', token })
    } catch (error) {
        res.status(500).json({ message: ' Error logging in user', error });
    }
   

};
