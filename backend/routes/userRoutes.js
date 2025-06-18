const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { updateUserProfile, deleteUserProfile } = require('../controllers/authController')

router.put('/profile', protect, updateUserProfile)
router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        message: "This is a protected route",
        user: req.user
    })
})

router.delete('/profile', protect, deleteUserProfile)

module.exports = router


