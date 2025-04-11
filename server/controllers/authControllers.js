import collegeModel from "../models/collegeModel.js";
import donarsModel from "../models/donarsModel.js";
import organiserModel from "../models/organiserModel.js";
import jwt  from "jsonwebtoken";

export const Register=async(req,res,next)=>
{
    try {
        const {name,email,password,idno,address,collegeId,collegeName,phoneNumber}=req.body;

        const donar=await donarsModel.create({
            name,email,password,idno,address,collegeId,collegeName,phoneNumber
        })
        donar.isAuthenticated=true;
        donar.role="donar"
         await donar.save();
         const token=jwt.sign({id:donar._id,role:donar.role},process.env.JWT_SECRET,{expiresIn:'7d'})

         res.cookie('token',token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000
         })
        
         
         
         res.json({success:true,message:"Donar Regisered Successfully",donar});
       

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
        {    
           return  next(new Error("no user Found"));
        }
        
        if(user.password!=password)
        {
           return  next(new Error("Incorrect password"));
        }
        const token=jwt.sign({id:user._id,role},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            secure: false,
            sameSite: 'Lax',
         })
         user.isAuthenticated=true;
         
        
        await user.save();
        user.password=undefined;
        return res.json({success:true,message:"Logged In successfully",user})
    } catch (error) {
        return next(error)
    }
}

export const Logout=async(req,res,next)=>
{    
   
      try {
        const {userId,role}=req.body;
        let user;
        if(!userId || !role)
        {
            next(new Error("Not authorized"))
        }
        if(role==='college')
            {
                 user=await collegeModel.findOne({_id:userId});
    
            }
            if(role==='donar')
            {
                 user=await donarsModel.findOne({_id:userId});
    
            }
            if(role==='organiser')
            {
                 user=await organiserModel.findOne({_id:userId});
            }
            
            user.isAuthenticated=false;
        res.clearCookie('token',{
            httpOnly:true
        })
        res.json({success:true,message:"Loggedout successfully",user})
      } catch (error) {
        next(error)
      }
}

export const getWhoLoggedIn=async(req,res,next)=>
{
    try { 
        const {userId,role}=req.body;
        let user;
        if(!userId)
        {
            next(new Error("No one logged in Currently"))
        }
        if(!role)
        {
            return next(new Error("Role is not present"))
        }
        if(role==='donar')
        {
             user=await donarsModel.findById(userId);
        }
        if(role==='organiser')
        {
            user=await organiserModel.findById(userId);
        }
        if(role=='college')
        {
            user=await collegeModel.findById(userId);
        }
        res.json({success:true,message:'User currently logged in fetched successfully',user})
    } catch (error) {
        next(new Error(error))
    }
}

