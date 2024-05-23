import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const LOGGED_USER_KEY = 'logged_bloglist_user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_KEY)
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login(username, password)
      window.localStorage.setItem(
        LOGGED_USER_KEY, JSON.stringify(loginUser)
      )
      blogService.setToken(loginUser.token)
      setUser(loginUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(LOGGED_USER_KEY)
    blogService.clearToken()
    setUser(null)
  }

  if (!user) {
    return (
      <div>
        <h2>Login to application</h2>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in&nbsp;
        <button onClick={handleLogout}>
          Logout
        </button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
