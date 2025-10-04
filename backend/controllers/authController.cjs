const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const saltRounds = 10
const dotenv = require('dotenv')
const userModel = require('../models/userModel.cjs')
const signupAuthModel = require('../models/signupAuthModel.cjs')
const { text } = require('body-parser')
const { google } = require("googleapis");

dotenv.config()

const OAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRETE, process.env.REDIRECT_URL)
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

const sendMail = async (req, res) => {
    const { emailOTP } = req.body
    console.log(emailOTP)

    let ACCESS_TOKEN = await OAuth2Client.getAccessToken();


    try {
        let userData = await userModel.findOne({ email: emailOTP })
        if (userData) {
            let prev_expiry = userData.passwordResetOtpExpiry
            if (new Date() < new Date(prev_expiry)) {
                res.send({ expiry: prev_expiry, text: 'You can use your last OTP' });
            }
            else {
                let resetOTP = crypto.randomBytes(2).toString("hex");
                let expiry = new Date(Date.now() + 0.5 * 60 * 1000)
                await userModel.updateOne({ email: emailOTP }, { $set: { passwordResetOtp: resetOTP, passwordResetOtpExpiry: expiry } })


                const gmail = google.gmail({ version: "v1", auth: OAuth2Client });

                const messageParts = [
                    'From: "Me" <yourname@gmail.com>',
                    'To: recipient@example.com',
                    'Subject: Test Email from Gmail API',
                    '',
                    'Hello! This is a test message sent via Gmail API.'
                ];
                const message = messageParts.join('\n');

                const encodedMessage = Buffer.from(message)
                    .toString("base64")
                    .replace(/\+/g, "-")
                    .replace(/\//g, "_")
                    .replace(/=+$/, "");

                await gmail.users.messages.send({
                    userId: "me",
                    requestBody: {
                        raw: encodedMessage,
                    },
                });
                

                res.send({ expiry: expiry, text: `OTP sent to ${emailOTP}` });
            }
        }
        else {
            res.json('user not found!')
        }
    }
    catch (err) {
        res.json('something went wrong! Try again')
        console.log(err)
    }
}
const sendSignupOTP = async (req, res) => {
    const { email } = req.body
    try {
        let checkUserExist = await userModel.findOne({ email: email })
        if (checkUserExist) {
            res.json('User already exist!')
        }
        else {
            let userData = await signupAuthModel.findOne({ email: email })
            if (userData) {
                let prev_expiry = userData.signupOtpExpiry
                if (new Date() < new Date(prev_expiry)) {
                    res.send({ expiry: prev_expiry, text: 'You can use your last OTP' });
                }
                else {
                    let resetOTP = crypto.randomBytes(2).toString("hex");
                    let expiry = new Date(Date.now() + 0.5 * 60 * 1000)
                    await signupAuthModel.updateOne({ email: email }, { $set: { signupOtp: resetOTP, signupOtpExpiry: expiry } })
                    if (userData) {
                        let email = userData.email
                        const mail = {
                            from: process.env.EMAIL,
                            to: email,
                            subject: 'Signup OTP',
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
        console.log("signup otp")
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