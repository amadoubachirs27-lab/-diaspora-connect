const express = require('express');
const router = express.Router();
const { getQuestionsByCategory, createQuestion } = require('../controllers/questionController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/:categoryId', verifyToken, getQuestionsByCategory);
router.post('/', verifyToken, createQuestion);

module.exports = router;