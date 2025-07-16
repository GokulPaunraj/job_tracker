const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:Number,required:true},
    email:{type:String,required:true},
    jobs_list:{type:[{id:Number,companyName:String,role:String,ctc:Number,date:String,status:String}],required:true},
    graph_data:{type:Array,required:true},
})

module.exports = mongoose.model("allData",userModel)