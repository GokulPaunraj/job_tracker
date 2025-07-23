const { Resend } = require("resend")
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const saltRounds = 10
const dotenv = require('dotenv')
const userModel = require('../models/userModel.cjs')
const signupAuthModel = require('../models/signupAuthModel.cjs')

dotenv.config()

const sendMail = async (req, res) => {
    const { userNameOTP } = req.body
    try {
        let userData = await userModel.findOne({ username: userNameOTP })
        let prev_expiry = userData.passwordResetOtpExpiry
        if (new Date() < new Date(prev_expiry)) {
            res.send({ expiry: prev_expiry, text: 'You can use your last OTP' });
        }
        else {
            let resetOTP = crypto.randomBytes(2).toString("hex");
            let expiry = new Date(Date.now() + 3 * 60 * 1000)
            await userModel.updateOne({ username: userNameOTP }, { $set: { passwordResetOtp: resetOTP, passwordResetOtpExpiry: expiry } })
            if (userData) {
                let email = userData.email
                const resend = new Resend(process.env.RESEND_AIP_KEY);
                const { data, error } = await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: email,
                    subject: 'Password Rest OTP',
                    html: `<p><strong>${resetOTP}</strong> is your otp!</p>`
                })
                if (data) {
                    res.send({ expiry: expiry, text: `OTP sent to ${email}` });
                }
                if (error) {
                    res.json('something went wrong! Try again')
                }
            }
            else {
                res.json('user not found!')
            }
        }
    }
    catch (err) {
        res.json('something went wrong! Try again')
    }
}
const sendSignupOTP = async (req, res) => {
    const { user, email } = req.body
    try {
        let userData = await signupAuthModel.findOne({ username: user })
        if (userData) {
            let prev_expiry = userData.signupOtpExpiry
            if (new Date() < new Date(prev_expiry)) {
                res.send({ expiry: prev_expiry, text: 'You can use your last OTP' });
            }
            else {
                let resetOTP = crypto.randomBytes(2).toString("hex");
                let expiry = new Date(Date.now() + 3 * 60 * 1000)
                await signupAuthModel.updateOne({ username: user }, { $set: { signupOtp: resetOTP, signupOtpExpiry: expiry } })
                if (userData) {
                    let email = userData.email
                    const resend = new Resend(process.env.RESEND_AIP_KEY);
                    const { data, error } = await resend.emails.send({
                        from: 'onboarding@resend.dev',
                        to: email,
                        subject: 'Password Rest OTP',
                        html: `<p><strong>${resetOTP}</strong> is your otp!</p>`
                    })
                    if (data) {
                        res.send({ expiry: expiry, text: `OTP sent to ${email}` });
                    }
                    if (error) {
                        console.log("error data")
                        console.log(error)
                        res.json('something went wrong! Try again')
                    }
                }
                else {
                    res.json('user not found!')
                }
            }
        }
        else {
            let resetOTP = crypto.randomBytes(2).toString("hex");
            let expiry = new Date(Date.now() + 3 * 60 * 1000)
            await signupAuthModel.insertMany({ username: user, email: email, signupOtp: resetOTP, signupOtpExpiry: expiry })
            const resend = new Resend(process.env.RESEND_AIP_KEY);
            const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Password Rest OTP',
                html: `<p><strong>${resetOTP}</strong> is your otp!</p>`
            })
            if (data) {
                res.send({ expiry: expiry, text: `OTP sent to ${email}` });
            }
            if (error) {
                console.log(error)
                console.log("error")
                res.json('something went wrong! Try again')
            }
        }
    }
    catch (err) {
        console.log("catch")
        console.log(err)
        res.json('something went wrong! Try again')
    }
}
const verifySignupOTP = async (req, res) => {
    let { user, otp } = req.body

    try {
        let userData = await signupAuthModel.findOne({ username: user })
        let expiry = userData.signupOtpExpiry
        if (userData) {
            if (new Date() < new Date(expiry)) {
                if (otp === userData.signupOtp) {
                    res.json("success")
                }
                else {
                    res.json("Wrong OTP!")
                }
            }
            else {
                res.json("OTP expired")
            }
        }
        else {
            res.json('User not found!')
        }
    }
    catch (err) {
        res.json('something went wrong! Try again')
    }

}
const verifyOtp = async (req, res) => {
    let { userNameOTP, otp } = req.body

    try {
        let userData = await userModel.findOne({ username: userNameOTP })
        let expiry = userData.passwordResetOtpExpiry
        if (userData) {
            if (new Date() < new Date(expiry)) {
                if (otp === userData.passwordResetOtp) {
                    res.json("success")
                }
                else {
                    res.json("Wrong OTP!")
                }
            }
            else {
                res.json("OTP expired")
            }
        }
        else {
            res.json('User not found!')
        }
    }
    catch (err) {
        res.json('something went wrong! Try again')
    }

}

const resetPassword = async (req, res) => {
    let { userNameOTP, newPassword } = req.body
    try {
        let hashedPassword = await bcrypt.hash(newPassword, saltRounds)
        await userModel.updateOne({ username: userNameOTP }, { $set: { password: hashedPassword, passwordResetOtp: '', passwordResetOtpExpiry: '' } })
        res.json('New password updated!')
    }
    catch (err) {
        res.json('Something went wrong. Try again!')
        console.log(err)
    }
}

module.exports = { sendMail, verifyOtp, resetPassword, sendSignupOTP, verifySignupOTP }