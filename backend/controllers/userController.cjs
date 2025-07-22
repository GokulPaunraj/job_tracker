const userModel = require('../models/userModel.cjs')
const bcrypt = require('bcrypt')
const saltRounds = 10

const getUserData = async (req,res)=>{
    try{
        const {userName} = req.body
        const userData = await userModel.findOne({username:userName})
        if(userData){
                res.send({data:userData})
        }
        else{
            res.json("User not found!")
        }
    }
    catch(err){
        res.json(err)
    }
}
const signinUser = async (req,res)=>{
    try{
        const {usernameInput,passwordInput} = req.body
        const userData = await userModel.findOne({username:usernameInput})
        if(userData){
            let match = await bcrypt.compare(passwordInput,userData.password)
            if(match){
                res.send({data:userData})
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
            res.json("success")
        }
    }
    catch(err){
        console.log("Something went wrong")
        console.log(err)
    }
}

const updateJobsList = async (req,res)=>{
    const {username, new_list} = req.body
    try{
        await userModel.updateOne({username:username},{$set:{jobs_list:new_list}})
        res.json("success")
    }
    catch(err){
        res.json(err)
    }
}
const updateJobsHistory = async (req,res)=>{
    const {username, new_history_list} = req.body
    try{
        await userModel.updateOne({username:username},{$set:{jobs_history:new_history_list}})
        res.json("success")
    }
    catch(err){
        res.json(err)
    }
}

module.exports = {getUserData, createUserData, signinUser, updateJobsList, updateJobsHistory}