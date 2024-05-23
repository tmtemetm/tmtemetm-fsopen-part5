import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username:&nbsp;
        <input
          name="username"
          autoComplete="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div>
        Password:&nbsp;
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">
          Login
        </button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
