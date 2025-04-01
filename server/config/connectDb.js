import mongoose from "mongoose";

 const connectDb =async()=>
{       try {
               await mongoose.connect(process.env.MONGOURL)
               console.log("DataBase Connected Successfully");
        } catch (error) {
            console.log(error)
        }
    
}
export default connectDb;

