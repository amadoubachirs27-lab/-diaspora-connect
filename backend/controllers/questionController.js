const db = require('../config/db');

// GET QUESTIONS BY CATEGORY
const getQuestionsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const [questions] = await db.query(
      `SELECT q.*, u.username 
       FROM questions q 
       JOIN users u ON q.user_id = u.id 
       WHERE q.category_id = ? 
       ORDER BY q.created_at DESC`,
      [categoryId]
    );
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

// POST A QUESTION
const createQuestion = async (req, res) => {
  const { title, body, category_id } = req.body;
  const user_id = req.user.id;

  if (!title || !body || !category_id) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    await db.query(
      'INSERT INTO questions (title, body, user_id, category_id) VALUES (?, ?, ?, ?)',
      [title, body, user_id, category_id]
    );
    res.status(201).json({ message: 'Question created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

module.exports = { getQuestionsByCategory, createQuestion };