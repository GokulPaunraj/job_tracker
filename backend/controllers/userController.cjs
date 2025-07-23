const userModel = require('../models/userModel.cjs')
const bcrypt = require('bcrypt')
const { text } = require('body-parser')
const jwt = require('jsonwebtoken')
const saltRounds = 10

require('dotenv').config()

const getUserData = async (req,res)=>{
    try{
        const userName = req.userName
        const userData = await userModel.findOne({username:userName})
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
        const {usernameInput,passwordInput} = req.body
        const userData = await userModel.findOne({username:usernameInput})
        if(userData){
            let match = await bcrypt.compare(passwordInput,userData.password)
            if(match){
                const token = jwt.sign({userName:usernameInput}, process.env.SECRET_KEY, {expiresIn:'30d'})
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
    const {user, password, email, jobs_list, jobs_history, passwordResetOtp, passwordResetOtpExpiry} = req.body
    let hashedPassword = await bcrypt.hash(password,saltRounds)
    const data = {
        username:user,
        password:hashedPassword,
        email:email,
        jobs_list:jobs_list,
        jobs_history : jobs_history,
        passwordResetOtp : passwordResetOtp,
        passwordResetOtpExpiry : passwordResetOtpExpiry
    }
    try{
        const checkerFlag = await userModel.findOne({username:user})
        if(checkerFlag){
            res.json("exist");
        }
        else{
            await userModel.insertMany([data])
            const token = jwt.sign({userName:user}, process.env.SECRET_KEY, {expiresIn:'30d'})
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
    const userName = req.userName
    try{
        await userModel.updateOne({username:userName},{$set:{jobs_list:new_list}})
        res.json("success")
    }
    catch(err){
        res.json(err)
    }
}
const updateJobsHistory = async (req,res)=>{
    const {new_history_list} = req.body
    const userName = req.userName
    try{
        await userModel.updateOne({username:userName},{$set:{jobs_history:new_history_list}})
        res.json("success")
    }
    catch(err){
        res.json(err)
    }
}

module.exports = {getUserData, createUserData, signinUser, updateJobsList, updateJobsHistory}