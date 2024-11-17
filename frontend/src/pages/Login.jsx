import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/authSlice'
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
  })
  return (
    <>
   <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </>
  )
}

export default Login
