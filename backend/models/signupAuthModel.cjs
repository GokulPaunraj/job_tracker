const mongoose = require('mongoose')

const signupAuthModel = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    signupOtp : {type: String, required: true},
    signupOtpExpiry : {type:String, required: true}
})

module.exports = mongoose.model("pending_signup", signupAuthModel)