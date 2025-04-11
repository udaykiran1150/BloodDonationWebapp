import postsModel from "../models/postsModel.js";

export const createPost=async(req,res,next)=>
{
    try {
        const {userId,description,collegeName}=req.body;
        const temp=new Date();
        const date=new Date(temp.getTime() + (5.5 * 60 * 60 * 1000));
        if(!description)
        {
            next(new Error("Please provide some description for the post"))
        }
        const post=await postsModel.create({
            organiserId:userId,
            description,
            date,
            collegeName
        })
        res.json({success:true,message:"Post created Successfully",post})

    } catch (error) {
        next(error)
    }
}
export const deletePost=async(req,res,next)=>
{
    try {
        const {postId}=req.body;
        if(!postId)
        {
            next(new Error("please provide the post id to delete Post"))
        }
        await postsModel.findByIdAndDelete(postId);
        res.json({success:true,message:"Post deleted successfully"})
    } catch (error) {
        next(error)
    }
}
export const updatePost=async(req,res,next)=>
{
    try {
        const {postId,description}=req.body;
        await postsModel.findByIdAndUpdate(postId,{
            description
        },{new:true})
        res.json({success:true,message:"post updated successfully"})
    } catch (error) {
        next(error)
    }
}

export const getPostByOrganiserId=async(req,res,next)=>
{
    try {
        const {organiserId}=req.body;
        if(!organiserId)
        {
            next(new Error("Please provide the organiser Id to see posts"))
        }
        const posts=await postsModel.find({organiserId}).populate({
            path:"organiserId",
            select:'-password',
            populate:{
                path:"collegeName",
                 select:"-password"
            }
        });
        res.json({success:true,message:"postst fetched successfully",posts})
    } catch (error) {
        next(error)
    }
}

