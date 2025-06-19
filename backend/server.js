require("dotenv").config(); 
const express = require("express");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

connectDB();

const app = express();

// MIDDLEWARE: Parses incoming JSON data
app.use(express.json());

app.use(cors({
  origin: 'https://jwt-auth-sqg8.vercel.app/', // Vercel URL
  credentials: true
}));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
