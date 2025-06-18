import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Welcome Home</h1>}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' 
        element={
          <PrivateRoute>
        <DashboardPage/>
        </PrivateRoute>
        }
        />
      </Routes>
    </Router>
  )
}

export default App