const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.cjs')

router.post("/", userController.getUserData)
router.post("/signup", userController.createUserData)
router.post("/signin", userController.signinUser)
router.post("/jobs_list", userController.updateJobsList)
router.post("/jobs_history", userController.updateJobsHistory)

module.exports = router