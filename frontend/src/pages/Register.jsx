import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!username || username.length < 3) newErrors.username = 'Invalid Username.'
    if (password.length < 8 || !/\d/.test(password)) newErrors.password = 'Password must be at least 8 characters and contain a number.'
    if (password !== repeatPassword) newErrors.repeatPassword = 'The two passwords do not match.'
    if (!agreed) newErrors.agreed = 'You must agree to the Terms and Conditions.'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    try {
      await axios.post(`https://diaspora-connect-production.up.railway.app/api/auth/register`, { username, password })
      navigate('/login')
    } catch (err) {
      setErrors({ username: err.response?.data?.message || 'Registration failed.' })
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="app-title">🌍 DiasporaConnect</h1>
        <h2>Register user</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors({ ...errors, username: '' }) }}
            />
            {errors.username && <span className="error-msg">{errors.username}</span>}
          </div>
          <div className="form-row">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }) }}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>
          <div className="form-row">
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => { setRepeatPassword(e.target.value); setErrors({ ...errors, repeatPassword: '' }) }}
            />
            {errors.repeatPassword && <span className="error-msg">{errors.repeatPassword}</span>}
          </div>
          <div className="form-row checkbox-row">
            <label style={{ color: errors.agreed ? 'red' : 'inherit' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: '' }) }}
              />
              I agree to the Terms and Conditions and Privacy Policy
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register