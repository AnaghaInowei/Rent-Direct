const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const{
    createProperty,
    getProperties,
    updateProperty,
    deleteProperty,
} = require('../controllers/propertyController');

router.post('/', authMiddleware, createProperty);
router.get('/', authMiddleware, getProperties);
router.put('/', authMiddleware, updateProperty);
router.delete('/', authMiddleware, deleteProperty);

module.exports = router;