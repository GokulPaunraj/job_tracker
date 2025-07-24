const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json("Access Denied");

    try{
        const payload = jwt.verify(token,process.env.SECRET_KEY)
        req.email = payload.email
        next()
    }
    catch(err){
        return res.status(403).json("Token expired")
    }
}

module.exports = {verifyToken}