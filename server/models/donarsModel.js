import mongoose from 'mongoose'

const donarsSchema=new mongoose.Schema({
      name:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      password:{type:String,default:"rgukt@123"},
      phoneNumber:{type:String,required:true}, 
      idno:{type:String,required:true},
      collegeName:{type:String,required:true},
      collegeId:{type:mongoose.Schema.Types.ObjectId,ref:"Colleges"},
      address:{type:String},
      img:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5CQxdTYvVk0IxK9JjTg3YaEPXKfuPfCK3mg&s"},
      isAuthenticated:{type:Boolean,default:false},
      role:{type:String,default:"donar"}

})

const donarsModel=mongoose.model('Donars',donarsSchema);
export default donarsModel; 