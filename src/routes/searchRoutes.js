const express = require('express');
const router = express.Router();
const { searchProperties } = require('../controllers/searchController');

router.get('/', searchProperties);

module.exports = router;
