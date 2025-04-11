import mongoose from 'mongoose'
const postsSchema=new mongoose.Schema({
    organiserId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organisers',
        required:true
    },
    date:{type:Date},
    description:{type:String},
    collegeName:{type:String,required:true}
})
const postsModel=mongoose.model('posts',postsSchema);

export default postsModel;