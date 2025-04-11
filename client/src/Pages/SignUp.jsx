import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Signup.css'
import { toast } from "react-toastify";
import {
  faUser,
  faEnvelope,
  faKey,
  faLocationDot,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import {useNavigate} from 'react-router-dom'
import { userContext } from "../Context/Context";
const SignUp = () => {
  const [colleges, setColleges] = useState([]);
  const[name,setName]=useState("");
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const[idno,setIdno]=useState("");
  const[address,setAddress]=useState("")
  const[collegeName,setCollegeName]=useState("")
   const navigate=useNavigate()

  const {user,setUser}=useContext(userContext)
  const {DcolegeId,setDcollegeId,CurrentColleg,setCurrentCollege,getCurrentCollegeId}=useContext(userContext)
  
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
  console.log(BACKEND_URL)
   //Register 

  
  const HandleRegister=async()=>
  {
    console.log(name,email,password,phoneNumber,idno,address,collegeName)
   
    try {
        const respose=await axios.post(`${BACKEND_URL}/auth/registerdonar`,{
          name,
          email,
          password,
          idno,
          address, 
          collegeName,
          phoneNumber,
          role:"donar"
      },{withCredentials:true})
     let user=respose.data.donar;
     
     setUser(user)

        if(respose.data.success)
        {     
            
              navigate('/donar')
        }
        else{
          console.log(respose.data.error);
        }
    } catch (error) {
       toast.error(error)
       console.log(error)
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      
      const response = await axios.get(
        `${BACKEND_URL}/college/getallcolleges`
      );

      setColleges(response.data.colleges);
    };
    fetchData();
    
  },[]);
 

  return (
    <div className="relative w-screen h-screen text-white  overflow-hidden items-center flex justify-center">
      <div
        className="absolute inset-0 bg-[url(https://media.assettype.com/sentinelassam-english%2F2024-07%2F50ad8c6e-d153-4ca3-a3ff-0aa99b3b2b64%2FBlood_Donation_PNG_Picture_1024x538.jpg)] 
          bg-cover bg-center lg:blur-none   blur-xs"
      ></div>

      
      <div className=" glass-card absolute text-black lg:right-20  top-[20%] justify-center text-center  lg:top-30   border-2 w-100">
        <h2 className="font-bold text-4xl">Sign Up</h2>
        <div className="mt-7 w-full flex flex-col gap-4">
          <div className=" gap-7 flex  items-center justify-center" >
            <FontAwesomeIcon icon={faUser} />
            <input type="text" placeholder="Enter name"  className="outline-none   text-[#686363]" onChange={(e)=>{setName(e.target.value)}}/>
          </div>
          <div className=" gap-7 flex  items-center justify-center" >
            <FontAwesomeIcon icon={faUser} />
            <input type="text" placeholder="Enter ID no"  className="outline-none   text-[#686363]" onChange={(e)=>{setIdno(e.target.value)}}/>
          </div>
          <div className=" gap-7 flex  items-center justify-center">
            <FontAwesomeIcon icon={faPhone} />
            <input type="text" placeholder="Enter Phone Number" className="outline-none text-[#686363]" onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
          </div>
          <div className=" gap-7 flex  items-center justify-center">
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" placeholder="Enter Email"  className="outline-none text-[#686363]" onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <div className=" gap-7 flex  items-center justify-center">
            <FontAwesomeIcon icon={faKey} />
            <input type="password" placeholder="Enter password"  className="outline-none text-[#686363]" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <div >
            <select className="outline-none" onChange={(e)=>{setCollegeName(e.target.value)}}>
              <option className="py-10">College</option>
              {colleges?.map((college) => (
                <option key={college._id}>{college?.collegeName?.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div className=" gap-10 flex  items-center justify-center">
            <FontAwesomeIcon icon={faLocationDot} />
            <textarea placeholder="Enter your current location" className="outline-none text-[#686363]"  onChange={(e)=>{setAddress(e.target.value)}}></textarea>
          </div>
          <button className="bg-red-400 w-full py-2 rounded-2xl mt-2 text-gray-700" onClick={HandleRegister}>Submit</button>
          <div className="text-gray-400">
            <p>Already have an account ? <a href="/" className="text-blue-700 hover:underline hover:text-blue-400">Sign in</a> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
