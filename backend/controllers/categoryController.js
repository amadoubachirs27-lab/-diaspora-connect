const db = require('../config/db');

// GET ALL CATEGORIES
const getCategories = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

module.exports = { getCategories };