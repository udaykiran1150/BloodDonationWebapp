import mongoose from "mongoose";

const organiserSchema=new mongoose.Schema({
      name:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      password:{type:String,required:true},
      idno:{type:String,required:true,unique:true},
      phoneNumber:{type:String,required:true,unique:true},
      status:{type:Boolean,default:false},
      collegeId:
      {type:mongoose.Schema.Types.ObjectId,
        ref:"Colleges",required:true}
})
const organiserModel=mongoose.model('Organisers',organiserSchema);
export default organiserModel;