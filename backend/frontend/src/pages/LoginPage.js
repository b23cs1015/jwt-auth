import React, { useState } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setMessage('Login successful');
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token); // 🪪 Save token in localStorage
      navigate('/dashboard')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className={styles.input} name="email" onChange={handleChange} placeholder="Email" />
        <input className={styles.input} name="password" type="password" onChange={handleChange} placeholder="Password" />
        <button className={styles.button} type="submit">Login</button>
      </form>
      <p className={styles.message}>{message}</p>
      {token && <p className={styles.token}>Token: {token}</p>}
    </div>
  );
}

export default LoginPage;
