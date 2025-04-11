import mongoose from "mongoose";

const organiserSchema=new mongoose.Schema({
      name:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      password:{type:String,required:true},
      idno:{type:String,required:true,unique:true},
      phoneNumber:{type:String,required:true,unique:true},
      status:{type:Boolean,default:false},
      collegeName:{type:String,required:true},
      img:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5CQxdTYvVk0IxK9JjTg3YaEPXKfuPfCK3mg&s"},
      isAuthenticated:{type:Boolean,default:false},
      role:{type:String,default:"organiser"}


})
const organiserModel=mongoose.model('Organisers',organiserSchema);
export default organiserModel;