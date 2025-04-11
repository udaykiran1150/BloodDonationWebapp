import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Signup.css";
import {
  faUser,
  faEnvelope,
  faKey,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../Context/Context";

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
console.log(BACKEND_URL)

const LoginPage = () => {
  const [email, setEmail] = useState();
  const[password,setPassword]=useState();
  const [role, setRole] = useState();
  const{user,setUser,temp,setTemp}=useContext(userContext);
  const [fixed,setFixed]=useState(false);
 


  const navigate=useNavigate();
  

  const HandleLogin=async()=>
  {
       try {

        
         
        const response=await axios.post(`${BACKEND_URL}/auth/loginuser`,{role,email,password},{withCredentials:true})
      
        const loggedInUser = response.data.user;
        if(response.data.success )
        {
         
          setUser(loggedInUser);
          

          console.log("User set to:", response.data.user); 
          
          toast.success(`${role.toUpperCase()}  Login successfull`)
          
         
         
            if(role==='donar')
              {
                  navigate('/donar')
              }
              else if(role==='college')
              {
                  navigate('/college')
              }
              
              else if(role==='organiser'){
              
                  navigate('/organiser')
              }
          
          
        }
        
       } catch (error) {
        toast.error(error.response.data.message)
       }
  }
  return (
    <div className="relative w-screen h-screen text-white  ">
      <div
        className="absolute inset-0 bg-[url(https://media.assettype.com/sentinelassam-english%2F2024-07%2F50ad8c6e-d153-4ca3-a3ff-0aa99b3b2b64%2FBlood_Donation_PNG_Picture_1024x538.jpg)] 
              bg-cover bg-center lg:blur-none   blur-xs"
      ></div>

      <div className=" glass-card absolute text-black lg:right-20  top-[20%] justify-center text-center  lg:top-30   border-2 w-100">
        <h2 className="font-bold text-4xl">Sign In</h2>
        <div className="mt-7 w-full flex flex-col gap-9">
          <div className=" gap-7 flex  items-center justify-center">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              placeholder="Enter Email"
              className="outline-none text-[#686363]"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className=" gap-7 flex  items-center justify-center">
            <FontAwesomeIcon icon={faKey} />
            <input
              type="password"
              placeholder="Enter password"
              className="outline-none text-[#686363]"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-3.5 justify-center">
            <div className="flex items-center gap-1.5 group">
              <input type="radio"
               name="role"
                value="donar"
                onChange={(e)=>{setRole(e.target.value)}}
              /> <p>Donar</p>
            </div>
            <div className="flex items-center gap-1.5 group">
              <input type="radio"
               name="role"
               value="organiser"
               onChange={(e)=>{setRole(e.target.value)}}
               
               />
               <p>Organiser</p>
            </div>
            <div className="flex items-center gap-1.5 group">
              <input type="radio"
               name="role"
               value="college"
               onChange={(e)=>{setRole(e.target.value)}}
              />
              <p>college</p>
            </div>
          </div>

          <button className="bg-red-400 w-full py-2 rounded-2xl mt-2 text-gray-700" onClick={HandleLogin}>
            Submit
          </button>
          <div className="text-gray-400">
            <p>Don't you have an account ? <a href="/signup" className="text-blue-700 hover:underline hover:text-blue-400">Create one</a> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
