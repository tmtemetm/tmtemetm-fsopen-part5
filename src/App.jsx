import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const LOGGED_USER_KEY = 'logged_bloglist_user'

const extractErrorMessage = error => error?.response?.data?.error

const createErrorMessage = (message, error) => {
  const errorMessage = extractErrorMessage(error)
  if (errorMessage) {
    return `${message}: ${errorMessage}`
  }
  return message
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const displayNotification = (message, isError) => {
    if (notification) {
      clearTimeout(notification.timer)
    }
    const timer = setTimeout(() => setNotification(null), 5000)
    setNotification({
      message,
      isError: isError || false,
      timer
    })
  }

  const displayError = message => displayNotification(message, true)

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
      displayNotification(`${loginUser.name} logged in successfully`)
    } catch (error) {
      displayError(createErrorMessage('Login failed', error))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(LOGGED_USER_KEY)
    blogService.clearToken()
    displayNotification(`${user.name} logged out successfully`)
    setUser(null)
  }

  const createBlog = async blog => {
    try {
      const created = await blogService.create(blog)
      setBlogs(blogs.concat(created))
      blogFormRef.current.toggleVisibility()
      displayNotification(`A new blog '${created.title}'${created.author ? ' by ' + created.author : ''} added`)
    } catch (error) {
      displayError(createErrorMessage(`Couldn't create blog ${blog.title}`, error))
    }
  }

  const handleLike = async blog => {
    try {
      const liked = await blogService.like(blog)
      setBlogs(blogs
        .map(b => b.id === liked.id ? liked : b))
      displayNotification(`Liked ${liked.title}`)
    } catch (error) {
      displayError(createErrorMessage(`Couldn't like blog ${blog.title}`, error))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification notification={notification} />
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

  const sortedBlogs = [...blogs]
    .sort((b1, b2) => b2.likes - b1.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in&nbsp;
        <button onClick={handleLogout}>
          Logout
        </button>
      </p>
      <Togglable
        buttonLabel="Create new blog"
        ref={blogFormRef}
      >
        <h3>Create new</h3>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
        />
      )}
    </div>
  )
}

export default App
