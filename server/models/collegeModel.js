import mongoose from "mongoose";

const collegeSchema=new mongoose.Schema({
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        address:{type:String,required:true}
})

const collegeModel=mongoose.model('Colleges',collegeSchema);
export default collegeModel;