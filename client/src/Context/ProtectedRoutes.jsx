import React, { useContext, useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { userContext } from './Context';
import Loader1 from '../Components/Loader1';


const ProtectedRoutes = ({ children, roles }) => {
    const {user, getWhoLoogedIn}=useContext(userContext);
    const [loading, setLoading] = useState(true);


    useEffect(()=>
    {
        const init=async()=>
        {
            await  getWhoLoogedIn();
            setLoading(false);
        }
        init();
    },[])
    console.log("user is ",user)

    if (loading) {
        return   <div className='w-ful min-h-screen flex justify-center items-center '> <Loader1/></div>
      }
console.log(user)
    if(!user?.isAuthenticated)
    {
       return  <Navigate to={'/'}/>
    }
    if(!roles.includes(user?.role))
    {
        return <Navigate to={'/unauthorized'}/>
    }
    return children
  
    
};

export default ProtectedRoutes;
