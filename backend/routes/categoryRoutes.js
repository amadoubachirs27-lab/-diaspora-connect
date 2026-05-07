const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/categoryController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, getCategories);

module.exports = router;