import jwt from 'jsonwebtoken'
export const userAuth=async(req,res,next)=>
{
    const {token}=req.cookies;
    if(!token)
    {
        return res.json({success:false,message:"No Authorized"});
    }
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        if(!tokenDecode.id)
        {
           return res.json({success:false,message:"NOt an Authorized user login again"});
        }
        else{
            req.body.userId=tokenDecode.id;
        }
        next()
    } catch (error) {
        return res.json({success:false,message:"Error at authorization"})
    }
    
}