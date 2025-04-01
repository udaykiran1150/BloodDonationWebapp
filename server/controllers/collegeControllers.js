import collegeModel from "../models/collegeModel.js";
import donarsModel from "../models/donarsModel.js";
import organiserModel from "../models/organiserModel.js";

// FOR ADMIN TO MANIPULATE COLLEGE
export const AddCollege = async (req, res, next) => {
  try {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password || !address) {
      return next(new Error("please Provide all details"));
    }
    const college = await collegeModel.create({
      name,
      email,
      password,
      address,
    });
    await college.save();
    res
      .status(200)
      .json({ success: true, message: "college addedd successfully", college });
  } catch (error) {
    next(error.message);
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
    const { name, email, password, address } = req.body;

    if (!id) {
      next(new Error("please Provide Id"));
    }
    const college = await collegeModel.findById(id);
    if (!college) {
      next(new Error("No College Found"));
    }
    await collegeModel.findByIdAndUpdate(id,
      {
        name,
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
        const {collegeId}=req.body;
        if(!collegeId)
        {
          return next(new Error("College Not Found"));
        }
       const donars=await donarsModel.find({collegeId});
       const organisers=await organiserModel.find({collegeId});
          return res.json({success:true,message:"Donars and Organisers Fetched Successfully",donars,organisers})

      } catch (error) {
        next(error)
      }
}


// For Manupalating Organiser by College

export const AddOrganiser=async(req,res,next)=>
{
  try {
    const {name,email,password,phoneNumber,idno,status,collegeId}=req.body;

    const organiser=await organiserModel.create({
      name,email,password,phoneNumber,idno,status,collegeId
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
          const {organiserId,name,email,phoneNumber,address}=req.body;
          if(!organiserId)
          {
            next(new Error("No Organiser found"));
          }
          await organiserModel.findByIdAndUpdate(organiserId,{
            name,email,phoneNumber,address
          },{new:true})
          
          res.json({success:true,message:"Organiser Updated successfully"})
  } catch (error) {
    next(new Error(error))
  }
}



