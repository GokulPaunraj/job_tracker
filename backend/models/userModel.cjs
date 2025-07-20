const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    jobs_list: { type: [{ id: Number, companyName: String, role: String, ctc: Number, date: String, status: String }], required: true },
    jobs_history: { type: [{ id: Number, companyName: String, role: String, ctc: Number, date: String, status: String }], required: true },
})

module.exports = mongoose.model("allData", userModel)