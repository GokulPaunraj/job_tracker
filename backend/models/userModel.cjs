const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: false },
    email: { type: String, required: true },
    jobs_list: { type: [{ id: Number, companyName: String, role: String, ctc: Number, date: String, status: String }], required: true },
    jobs_history: { type: [{ id: Number, companyName: String, role: String, ctc: Number, date: String, status: String }], required: true },
    passwordResetOtp : {type: String},
    passwordResetOtpExpiry : {type:String}
})

module.exports = mongoose.model("allData", userModel)