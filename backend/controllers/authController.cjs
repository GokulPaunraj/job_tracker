const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const saltRounds = 10
const dotenv = require('dotenv')
const userModel = require('../models/userModel.cjs')
const signupAuthModel = require('../models/signupAuthModel.cjs')

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const sendMail = async (req, res) => {
    const { emailOTP } = req.body
    try {
        let userData = await userModel.findOne({ email: emailOTP })
        if (userData) {
            let prev_expiry = userData.passwordResetOtpExpiry
            if (new Date() < new Date(prev_expiry)) {
                res.send({ expiry: prev_expiry, text: 'You can use your last OTP' });
            }
            else {
                let resetOTP = crypto.randomBytes(2).toString("hex");
                let expiry = new Date(Date.now() + 3 * 60 * 1000)
                await userModel.updateOne({ email: emailOTP }, { $set: { passwordResetOtp: resetOTP, passwordResetOtpExpiry: expiry } })
            
                    let email = userData.email
                    const mail = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'Password Rest OTP',
                        html: `<p><strong>${resetOTP}</strong> is your otp!</p>`
                    }
                    await transporter.sendMail(mail)
                    res.send({ expiry: expiry, text: `OTP sent to ${email}` });
            }
        }
        else {
            res.json('user not found!')
        }
    }
    catch (err) {
        res.json('something went wrong! Try again')
    }
}
const sendSignupOTP = async (req, res) => {
    const { email } = req.body
    try {
        let checkUserExist = await userModel.findOne({email:email})
        if(checkUserExist){
            res.json('User already exist!')
        }
        else{
            let userData = await signupAuthModel.findOne({ email: email })
            if (userData) {
                let prev_expiry = userData.signupOtpExpiry
                if (new Date() < new Date(prev_expiry)) {
                    res.send({ expiry: prev_expiry, text: 'You can use your last OTP' });
                }
                else {
                    let resetOTP = crypto.randomBytes(2).toString("hex");
                    let expiry = new Date(Date.now() + 3 * 60 * 1000)
                    await signupAuthModel.updateOne({ email: email }, { $set: { signupOtp: resetOTP, signupOtpExpiry: expiry } })
                    if (userData) {
                        let email = userData.email
                        const mail = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'Password Rest OTP',
                        html: `<p><strong>${resetOTP}</strong> is your otp!</p>`
                    }
                    await transporter.sendMail(mail)
                    res.send({ expiry: expiry, text: `OTP sent to ${email}` });
                    }
                    else {
                        res.json('user not found!')
                    }
                }
            }
            else {
                let resetOTP = crypto.randomBytes(2).toString("hex");
                let expiry = new Date(Date.now() + 3 * 60 * 1000)
                await signupAuthModel.insertMany({ email: email, signupOtp: resetOTP, signupOtpExpiry: expiry })
                const mail = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Password Rest OTP',
                    html: `<p><strong>${resetOTP}</strong> is your otp!</p>`
                }
                await transporter.sendMail(mail)
                res.send({ expiry: expiry, text: `OTP sent to ${email}` });
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
    let { email, otp } = req.body

    try {
        let userData = await signupAuthModel.findOne({ email: email })
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
    let { emailOTP, otp } = req.body

    try {
        let userData = await userModel.findOne({ email: emailOTP })
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
    let { emailOTP, newPassword } = req.body
    try {
        let hashedPassword = await bcrypt.hash(newPassword, saltRounds)
        await userModel.updateOne({ email: emailOTP }, { $set: { password: hashedPassword, passwordResetOtp: '', passwordResetOtpExpiry: '' } })
        res.json('New password updated!')
    }
    catch (err) {
        res.json('Something went wrong. Try again!')
        console.log(err)
    }
}

module.exports = { sendMail, verifyOtp, resetPassword, sendSignupOTP, verifySignupOTP }