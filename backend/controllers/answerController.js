const db = require('../config/db');

// GET ANSWERS BY QUESTION
const getAnswersByQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const [answers] = await db.query(
      `SELECT a.*, u.username 
       FROM answers a 
       JOIN users u ON a.user_id = u.id 
       WHERE a.question_id = ? 
       ORDER BY a.created_at ASC`,
      [questionId]
    );
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

// POST AN ANSWER
const createAnswer = async (req, res) => {
  const { body, question_id } = req.body;
  const user_id = req.user.id;

  if (!body || !question_id) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    await db.query(
      'INSERT INTO answers (body, user_id, question_id) VALUES (?, ?, ?)',
      [body, user_id, question_id]
    );
    res.status(201).json({ message: 'Answer posted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

module.exports = { getAnswersByQuestion, createAnswer };