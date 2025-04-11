import cloudinary from "../config/cloudinary.js";
import collegeModel from "../models/collegeModel.js";
import donarsModel from "../models/donarsModel.js";
import organiserModel from "../models/organiserModel.js";
import postsModel from "../models/postsModel.js";

// FOR ADMIN TO MANIPULATE COLLEGE
export const AddCollege = async (req, res, next) => {
  try {
    let { collegeName, email, password, address } = req.body;
    if (!collegeName || !email || !password || !address) {
      return next(new Error("please Provide all details"));
    }
    collegeName=collegeName.toUpperCase();
    const college = await collegeModel.create({
      collegeName,
      email,
      password,
      address,
    });
    
    await college.save();
    res
      .status(200)
      .json({ success: true, message: "college addedd successfully", college });
  } catch (error) {
    next(error);
  }
};

export const DeleteCollege = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) {
      next(new Error("Please provide Id"));
    }

    await collegeModel.findByIdAndDelete(id);
    res.send({ success: true, message: "college deleted successfully" });
  } catch (error) {
    next(new Error(error.message));
  }
};

export const UpdateCollege = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { collegName, email, password, address } = req.body;

    if (!id) {
      next(new Error("please Provide Id"));
    }
    const college = await collegeModel.findById(id);
    if (!college) {
      next(new Error("No College Found"));
    }
    await collegeModel.findByIdAndUpdate(id,
      {
        collegeName,
        email,
        password,
        address
      },
      {new:true}
     
    );
    res.json({success:true,message:"Updated Successfully"})
  } catch (error) {
    next(error)
  }
};

//FOR COLLEGE TO SEE THEIR DONARS AND ORGANISERS
export const getDonarsAndOrganisersInTheCollege=async(req,res,next)=>
{
      try {
        const {collegeName}=req.body;
        if(!collegeName)
        {
          return next(new Error("CollegeName Not Found"));
        }
       const donars=await donarsModel.find({collegeName});
       const organisers=await organiserModel.find({getCollegeIdByName});
          return res.json({success:true,message:"Donars and Organisers Fetched Successfully",donars,organisers})

      } catch (error) {
        next(error)
      }
}


// For Manupalating Organiser by College

export const AddOrganiser=async(req,res,next)=>
{
  try {
    const {name,email,password,phoneNumber,idno,status,collegeName}=req.body;

    const organiser=await organiserModel.create({
      name,email,password,phoneNumber,idno,status,collegeName
    })
     await organiser.save();

     res.json({success:true,message:"organiser Added Successfully"});

  } catch (error) {
    next(error)
  }
}

export const DeleteOrganiser=async(req,res,next)=>
{
      try {
         const {id}=req.body;
         if(!id)
         {
          next (new Error("Please provide the ID"));
         }
         await organiserModel.findByIdAndDelete(id);
         res.send({success:true,message:"Organiser Deleted successfully"});
      } catch (error) {
        next (error)
      }
}

export const UpdateOrganiser=async(req,res,next)=>
{
  try {
          const {organiserId,name,email,phoneNumber,address,collegeName}=req.body;
          if(!organiserId)
          {
            next(new Error("No Organiser found"));
          }
          await organiserModel.findByIdAndUpdate(organiserId,{
            name,email,phoneNumber,address,collegeName
          },{new:true})
          
          res.json({success:true,message:"Organiser Updated successfully"})
  } catch (error) {
    next(new Error(error))
  }
}


//Get All posts in the college

export const getAllPostByCollegeId=async(req,res,next)=>
  {
      try {
          const {collegeName}=req.body;
          if(!collegeName)
          {
              return next(new Error("Provide college Name"))
          }
          const posts=await postsModel.find({collegeName}).populate({
            path:"organiserId",
            select:"-password"
          })
          res.json({success:true,message:"posts fetched successfully",posts})
  
      } catch (error) {
          next(error);
      }
  }


//Get all colleges in the Database

export const getAllcolleges=async(req,res,next)=>
{
  try {
    const colleges=await collegeModel.find()
    
    return res.json({success:true,message:"Collgeges Fetched Successfully ",colleges})
  } catch (error) {
    next(error)
  }
}

export const getCollegeIdByName=async(req,res,next)=>
{
  try {

    const {collegeName}=req.body;
   
    const college=await collegeModel.findOne({name:collegeName});
    return res.json({collegeid:college._id})
    
  } catch (error) {
    next(error)
  }
}

// update Profile PIC

export const updateProfilePic=async(req,res,next)=>
{
      try {
        const {userId,role}=req.body;
        let user;
        if(role==='donar')
        {
             user=await donarsModel.findById(userId);
        }
        if(role==='organiser'){
          user=await organiserModel.findById(userId);
        }
        if(role==='college')
        {
            user=await collegeModel.findById(userId);
        }

        if(!user)
        {
          next(new Error("No user found"))
        }
        const file=req.file;
        const result=await cloudinary.uploader.upload(req.file.path);

        user.img=result.url;
        await user.save()
        res.json({success:true,message:"Image Uploaded successfully",url:result.url})
        
      } catch (error) {
         next(error)
      }
}

