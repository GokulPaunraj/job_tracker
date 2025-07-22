const {Resend} = require("resend")
const crypto = require('crypto')
const dotenv = require('dotenv')
const userModel = require('../models/userModel.cjs')
dotenv.config()

const sendMail = async (req,res)=>{
    let resetOTP = crypto.randomBytes(2).toString("hex");
    let expiry = new Date(Date.now() + 5 * 60 * 1000)
    const {userNameOTP} = req.body
    try{
        let userData = await userModel.findOne({username:userNameOTP})
        let prev_expiry = userData.passwordResetOtpExpiry
        await userModel.updateOne({username:userNameOTP},{$set:{passwordResetOtp:resetOTP,passwordResetOtpExpiry:expiry}})
        if(new Date() < new Date(prev_expiry)){
            res.json("you can use your last OTP")
        }
        else{
            if (userData){
                let email = userData.email
    
                const resend = new Resend(process.env.RESEND_AIP_KEY);
                const {data, error} = await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: email,
                    subject: 'Password Rest OTP',
                    html: `<p><strong>${resetOTP}</strong> is your otp!</p>`
                })
                if (data){
                    res.json(`OTP sent to ${email}`);
                }
                if(error){
                    res.json('something went wrong! Try again')
                }
            }
            else{
                res.json('user not found!')
            }
        }
    }
    catch(err){
        res.json('something went wrong! Try again')
    }
}

const verifyOtp = async(req,res)=>{
    let {userNameOTP, otp} = req.body

    try{
        let userData = await userModel.findOne({username:userNameOTP})
        let expiry = userData.passwordResetOtpExpiry
        if (userData){
            if(new Date() < new Date(expiry)){
                if(otp === userData.passwordResetOtp){
                    res.json("success")
                }
                else{
                    res.json("Wrong OTP!")
                }
            }
            else{
                res.json("OTP expired")
            }
        }
        else{
            res.json('User not found!')
        }
    }
    catch(err){
        res.json('something went wrong! Try again')
    }

}

module.exports = {sendMail, verifyOtp}