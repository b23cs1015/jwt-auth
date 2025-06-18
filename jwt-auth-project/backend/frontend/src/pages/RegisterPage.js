import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear individual field error on change
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await registerUser(formData);
      setMessage('Register successful');
      setErrors({});
      console.log(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Register</h2>

      <form onSubmit={handleSubmit} noValidate>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
        />
        {errors.name && <p className={styles.errorText}>{errors.name}</p>}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
        />
        {errors.password && <p className={styles.errorText}>{errors.password}</p>}

        <button className={styles.button} type="submit">Register</button>
      </form>

      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default RegisterPage;
