const userModel = require('../models/userModel.cjs')

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

const createUserData = async (req,res)=>{
    const {userName, password, email, jobs_applied,jobs_interviewing,jobs_offered,jobs_rejected} = req.body
    const data = {
        username:userName,
        password:password,
        email:email,
        jobs_applied:jobs_applied,
        jobs_interviewing:jobs_interviewing,
        jobs_offered:jobs_offered,
        jobs_rejected:jobs_rejected
    }
    try{
        const checkerFlag = await userModel.findOne({username:userName})
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
    }
}

const updateJobsList = async (req,res)=>{
    const {username, new_list, status} = req.body
    try{
        await userModel.updateOne({username:username},{$set:{jobs_list:new_list}})
        res.json("success")
    }
    catch(err){
        res.json(err)
    }
}

module.exports = {getUserData, createUserData, updateJobsList}