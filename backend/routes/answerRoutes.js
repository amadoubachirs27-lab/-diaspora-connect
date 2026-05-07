const express = require('express');
const router = express.Router();
const { getAnswersByQuestion, createAnswer } = require('../controllers/answerController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/:questionId', verifyToken, getAnswersByQuestion);
router.post('/', verifyToken, createAnswer);

module.exports = router;