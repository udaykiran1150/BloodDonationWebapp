import mongoose from "mongoose";

const collegeSchema=new mongoose.Schema({
        collegeName:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        address:{type:String,required:true},
        isAuthenticated:{type:Boolean,default:false},
        role:{type:String,default:"college"}
        
})

const collegeModel=mongoose.model('Colleges',collegeSchema);
export default collegeModel;