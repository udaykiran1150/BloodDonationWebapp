import collegeModel from "../models/collegeModel.js";
import donarsModel from "../models/donarsModel.js";
import organiserModel from "../models/organiserModel.js";
import jwt  from "jsonwebtoken";

export const Register=async(req,res,next)=>
{
    try {
        const {name,email,password,id,address,collegeId,collegeName,phoneNumber}=req.body;

        const donar=await donarsModel.create({
            name,email,password,id,address,collegeId,collegeName,phoneNumber
        })
         await donar.save();
         const token=jwt.sign({id:donar._id},process.env.JWT_SECRET,{expiresIn:'7d'})

         res.cookie('token',token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000
         })
         res.json({success:true,message:"Donar Regisered Successfully"});

    } catch (error) {
        next(error)
    }
}

export const Login=async(req,res,next)=>
{
    try {
        const {role,email,password}=req.body;
        let user;
        if(!role ||!email ||!password)
        {
            next (new Error("Please Provide all the details"));
        }
        if(role==='college')
        {
             user=await collegeModel.findOne({email});

        }
        if(role==='donar')
        {
             user=await donarsModel.findOne({email});

        }
        if(role==='organiser')
        {
             user=await organiserModel.findOne({email})
        }
       
        if(!user)
        {     console.log(user+"hi uday kiran")
           return  next(new Error("no user Found"));
        }
        
        if(user.password!=password)
        {
           return  next(new Error("Incorrect password"));
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000
         })

        user.password=undefined;
        return res.json({success:true,message:"Logged In successfully",user})
    } catch (error) {
        return next(error)
    }
}

export const Logout=async(req,res,next)=>
{
      try {
        res.clearCookie('token',{
            httpOnly:true
        })
        res.json({success:true,message:"Loggedout successfully"})
      } catch (error) {
        next(error)
      }
}
