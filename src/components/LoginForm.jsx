const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      Username:&nbsp;
      <input
        name="username"
        autoComplete="username"
        value={username}
        onChange={handleUsernameChange}
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
        onChange={handlePasswordChange}
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

export default LoginForm
