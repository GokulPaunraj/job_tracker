const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.cjs')

router.post("/", userController.getUserData)
router.post("/signup", userController.createUserData)
router.post("/jobs_list", userController.updateJobsList)

module.exports = router