const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.cjs')
const authController = require('../controllers/authController.cjs')
const jwtMiddleware = require('../middlewares/jwtMiddleware.cjs')

router.post("/", jwtMiddleware.verifyToken, userController.getUserData)
router.post("/jobs_list", jwtMiddleware.verifyToken, userController.updateJobsList)
router.post("/jobs_history", jwtMiddleware.verifyToken, userController.updateJobsHistory)

router.post("/signup", userController.createUserData)
router.post("/signin", userController.signinUser)
router.post("/otp_signup", authController.verifySignupOTP)
router.post("/signup_otp", authController.sendSignupOTP)
router.post("/otp", authController.sendMail)
router.post("/reset_otp", authController.verifyOtp)
router.post("/newpassword", authController.resetPassword)

module.exports = router