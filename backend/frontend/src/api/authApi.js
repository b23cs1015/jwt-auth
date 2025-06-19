import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL+ '/api/auth',
})

export const registerUser = (userData) => API.post('/register', userData)
export const loginUser = (userData) => API.post('/login', userData)

