import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import QuestionCard from '../components/QuestionCard'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState({ title: '', body: '' })
  const [showForm, setShowForm] = useState(false)

  const headers = { Authorization: `Bearer ${user.token}` }

  useEffect(() => {
    axios.get('${import.meta.env.VITE_API_URL}/api/categories', { headers })
      .then(res => setCategories(res.data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/questions/${selectedCategory.id}`, { headers })
        .then(res => setQuestions(res.data))
        .catch(() => {})
    }
  }, [selectedCategory])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handlePostQuestion = async (e) => {
    e.preventDefault()
    try {
      await axios.post('${import.meta.env.VITE_API_URL}/api/questions', {
        title: newQuestion.title,
        body: newQuestion.body,
        category_id: selectedCategory.id
      }, { headers })
      setNewQuestion({ title: '', body: '' })
      setShowForm(false)
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/questions/${selectedCategory.id}`, { headers })
      setQuestions(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🌍 DiasporaConnect</h1>
        <div className="user-info">
          <span>Welcome, <strong>{user.username}</strong></span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-body">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <main className="main-content">
          {!selectedCategory ? (
            <p className="placeholder">Select a Category to view its questions.</p>
          ) : (
            <>
              <div className="category-header">
                <h2>{selectedCategory.name}</h2>
                <button onClick={() => setShowForm(!showForm)} className="ask-btn">
                  {showForm ? 'Cancel' : '+ Ask a Question'}
                </button>
              </div>

              {showForm && (
                <form onSubmit={handlePostQuestion} className="question-form">
                  <input
                    type="text"
                    placeholder="Question title"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Describe your question..."
                    value={newQuestion.body}
                    onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })}
                    required
                  />
                  <button type="submit">Post Question</button>
                </form>
              )}

              {questions.length === 0 ? (
                <p className="placeholder">No questions yet. Be the first to ask!</p>
              ) : (
                questions.map(q => (
                  <QuestionCard key={q.id} question={q} headers={headers} />
                ))
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard