import mongoose from 'mongoose'

const donarsSchema=new mongoose.Schema({
      name:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      password:{type:String,default:"rgukt@123"},
      phoneNumber:{type:String,required:true},
      id:{type:String,required:true},
      collegeName:{type:String,required:true},
      collegeId:{type:mongoose.Schema.Types.ObjectId,ref:"Colleges"},
      address:{type:String}
})

const donarsModel=mongoose.model('Donars',donarsSchema);
export default donarsModel;