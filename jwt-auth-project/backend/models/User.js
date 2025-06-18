const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Name is reuired"],
        minlength: [3, 'Name must be at leasth 3 characters']
    },
    email: {
        type: String,
        required: [true, "Email is reuired"],
        unique: true,
        validate: {
        validator: function (email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is reuired"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
module.exports = User