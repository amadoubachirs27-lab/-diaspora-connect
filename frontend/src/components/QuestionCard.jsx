import { useState, useEffect } from 'react'
import axios from 'axios'

function QuestionCard({ question, headers }) {
  const [answers, setAnswers] = useState([])
  const [showAnswers, setShowAnswers] = useState(false)
  const [newAnswer, setNewAnswer] = useState('')

  useEffect(() => {
    if (showAnswers) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/answers/${question.id}`, { headers })
        .then(res => setAnswers(res.data))
        .catch(() => {})
    }
  }, [showAnswers])

  const handlePostAnswer = async (e) => {
    e.preventDefault()
    try {
      await axios.post('${import.meta.env.VITE_API_URL}/api/answers', {
        body: newAnswer,
        question_id: question.id
      }, { headers })
      setNewAnswer('')
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/answers/${question.id}`, { headers })
      setAnswers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="question-card">
      <h3>{question.title}</h3>
      <p>{question.body}</p>
      <div className="question-meta">
        <span>Asked by <strong>{question.username}</strong></span>
        <span>{new Date(question.created_at).toLocaleDateString()}</span>
      </div>

      <button className="toggle-answers" onClick={() => setShowAnswers(!showAnswers)}>
        {showAnswers ? 'Hide Answers' : `Show Answers (${answers.length})`}
      </button>

      {showAnswers && (
        <div className="answers-section">
          {answers.length === 0 ? (
            <p className="placeholder">No answers yet.</p>
          ) : (
            answers.map(a => (
              <div key={a.id} className="answer-card">
                <p>{a.body}</p>
                <span>— <strong>{a.username}</strong> · {new Date(a.created_at).toLocaleDateString()}</span>
              </div>
            ))
          )}

          <form onSubmit={handlePostAnswer} className="answer-form">
            <textarea
              placeholder="Write your answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              required
            />
            <button type="submit">Post Answer</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default QuestionCard