import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectDb from './config/connectDb.js'
const app=express();
import cors from 'cors'
import Collegerouter from './Routes/collegeRoutes.js'
import AuthRouter from './Routes/authRoutes.js';


connectDb()
app.get('/',(req,res)=>
{
    res.send(`<h2>welcome to our server</h2>`)
})

const PORT=process.env.PORT

app.use(express.json());
app.use(cors())
app.use(cookieParser())

//Routes for CRUD Operations
app.use('/college',Collegerouter)
app.use('/donar',AuthRouter)
//next function for handling error

app.use((err,req,res,next)=>
{
    res.status(500).send({success:false,message:err.message})
})
app.listen(PORT,()=>
{
    console.log(`http://localhost:${PORT}`)
})
