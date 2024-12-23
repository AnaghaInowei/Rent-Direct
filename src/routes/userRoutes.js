const express = require("express");
const { protect } = require("../utils/authMiddlesware");

const router = express.Router();

// Protected route
router.route("/profile").get(protect, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');const express = require('express');

// router.get('/:id', userController.getUser);
// router.post('/', userController.createUser);

// module.exports = router;
