const userModel = require('../models/userModel.cjs')
const signupAuthModel = require('../models/signupAuthModel.cjs')
const bcrypt = require('bcrypt')
const { text } = require('body-parser')
const jwt = require('jsonwebtoken')
const saltRounds = 10

require('dotenv').config()

const getUserData = async (req,res)=>{
    try{
        const email = req.email
        const userData = await userModel.findOne({email:email})
        if(userData){
                res.send({data:userData})
        }
        else{
            res.json("User not found!")
        }
    }
    catch(err){
        res.json("Server error! Try again later")
    }
}
const signinUser = async (req,res)=>{
    try{
        const {emailInput,passwordInput} = req.body
        const userData = await userModel.findOne({email:emailInput})
        if(userData){
            let match = await bcrypt.compare(passwordInput,userData.password)
            if(match){
                const token = jwt.sign({email:emailInput}, process.env.SECRET_KEY, {expiresIn:'30d'})
                res.send({data:userData,token:token})
            }
            else{
                res.json("wrong password")
            }
        }
        else{
            res.json("User not found!")
        }
    }
    catch(err){
        res.json(err)
    }
}
const signinGoogleUser = async (req,res)=>{
    try{
        const {googleEmail} = req.body
        const userData = await userModel.findOne({email:googleEmail})
        if(userData){
            if(true){
                const token = jwt.sign({email:googleEmail}, process.env.SECRET_KEY, {expiresIn:'30d'})
                res.send({data:userData,token:token})
            }
            else{
                res.json("wrong password")
            }
        }
        else{
            res.json("User not found!")
        }
    }
    catch(err){
        res.json(err)
    }
}

const createUserData = async (req,res)=>{
    const {username, password, email, jobs_list, jobs_history, passwordResetOtp, passwordResetOtpExpiry} = req.body
    let hashedPassword = password === '' ? null : await bcrypt.hash(password,saltRounds)
    const data = {
        username:username,
        password:hashedPassword,
        email:email,
        jobs_list:jobs_list,
        jobs_history : jobs_history,
        passwordResetOtp : passwordResetOtp,
        passwordResetOtpExpiry : passwordResetOtpExpiry
    }
    try{
        const checkEmail = await userModel.findOne({email:email})
        if(checkEmail){
            res.json("Email already exist");
        }
        else{
            await userModel.insertMany([data])
            const token = jwt.sign({email:email}, process.env.SECRET_KEY, {expiresIn:'30d'})
            await signupAuthModel.findOneAndDelete({email:email})
            res.send({token:token,text:'success'})
        }
    }
    catch(err){
        console.log("Something went wrong")
        console.log(err)
    }
}

const updateJobsList = async (req,res)=>{
    const {new_list} = req.body
    const email = req.email
    try{
        await userModel.updateOne({email:email},{$set:{jobs_list:new_list}})
        res.json("success")
    }
    catch(err){
        res.json(err)
    }
}
const updateJobsHistory = async (req,res)=>{
    const {new_history_list} = req.body
    const email = req.email
    try{
        await userModel.updateOne({email:email},{$set:{jobs_history:new_history_list}})
        res.json("success")
    }
    catch(err){
        res.json(err)
    }
}

module.exports = {getUserData, createUserData, signinUser, signinGoogleUser, updateJobsList, updateJobsHistory}