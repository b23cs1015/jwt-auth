import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DashboardPage.module.css';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        setMessage('Failed to load user profile');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dashboard</h2>

      {user ? (
        <div>
          <p className={styles.info}><strong>ID:</strong> {user.id}</p>
          <p className={styles.info}><strong>Name:</strong> {user.name}</p>
          <p className={styles.info}><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p className={styles.message}>{message || 'Loading user ...'}</p>
      )}

      <button className={styles.logoutButton} onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default DashboardPage;
