import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
export const userContext = createContext();
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProtectedRoutes from "./ProtectedRoutes";

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [posts,setPosts]=useState();
  const[DisLoading,setDIsLoading]=useState(false);
  const [temp,setTemp]=useState();


  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
  console.log(BACKEND_URL)

  const getWhoLoogedIn = async () => {
    const data = await axios.get(`${BACKEND_URL}/auth/getcurrentuser`, {
      withCredentials: true,
    });
    setUser(data.data.user);
    // console.log(data.data)
    await getPostsByCollegName(data.data.user?.collegeName)
    
  };
 

  useEffect(()=>
  {
          const init=async()=>
          {
            await getWhoLoogedIn();
          }
          init();
  },[])

 

  const logout = async () => {

    try {
      const response = await axios.get(`${BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });
      
      
      if(response.data.success)
      {
        toast.success(response.data.message)
        navigate("/");
      }
      
    } catch (error) {
      console.log(error)
    }
    
  };


  const getPostsByCollegName=async(collegeName)=>
  {
    
     setDIsLoading(true)
   
    const response=await axios.post(`${BACKEND_URL}/college/getallposts`,{collegeName},{withCredentials:true})
  
    setDIsLoading(false)
    setPosts(response.data.posts)
   
  }
  const values = {
    getWhoLoogedIn,
    user,
    posts,
    logout,
    getPostsByCollegName,
    DisLoading,
    temp,setTemp,
    setUser,
 
   
  };

  return <userContext.Provider value={values}>
    {children}
 
    </userContext.Provider>;
};

export default ContextProvider;
