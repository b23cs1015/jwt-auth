// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Auth Portal</h1>
      <p className={styles.subtitle}>Please choose an option:</p>
      <div className={styles.buttonContainer}>
        <Link to="/register" className={styles.button}>Register</Link>
        <Link to="/login" className={styles.button}>Login</Link>
      </div>
    </div>
  );
}

export default HomePage;
