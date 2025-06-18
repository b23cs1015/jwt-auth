require("dotenv").config(); 
const express = require("express");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes')


connectDB();

const app = express();

// MIDDLEWARE: Parses incoming JSON data
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
