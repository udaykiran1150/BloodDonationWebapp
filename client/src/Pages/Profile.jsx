import React, { useContext,useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../Context/Context'
import axios from 'axios'
import Spinner from '../Components/Spinner'

const Profile = () => {
    const {user,getWhoLoogedIn}=useContext(userContext)
    const [file,setFile]=useState("")
    const [image,setImage]=useState()
    const [isLoading,setIsLoading]=useState(false)
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
    


    const editClicked=()=>
    {
        document.getElementById('inputbox').click()
    }
    const updateProfileImg=async(e)=>
    {
        let selectedFile=e.target.files[0];
        const formData = new FormData();
        formData.append("image", selectedFile);
         

        try {
            
          setIsLoading(true)
            const response=await axios.post(`${BACKEND_URL}/college/uploadprofile-pic`,formData,
              { withCredentials: true })
                
              window.location.reload();
             
              setIsLoading(false)
           
        } catch (error) {
            console.log(error)
        }
    }

     useEffect(()=>
        {
          const init = async () => {
            await getWhoLoogedIn(); 
          };
          init();
        },[])


  return (
    <div className='min-h-screen md:px-0 px-3'>
        <NavBar/>
        <div className='grid lg:grid-cols-2 grid-cols-1 items-center h-full  mt-11 px-5 py-6 gap-5 '>
            <div className='flex justify-center relative'>
              {
                isLoading? <Spinner/>:

                <div>
                <img src={user?.img} className='rounded-full lg:h-70 lg:w-70 w-50 h-50 ' alt="" />
              <FontAwesomeIcon icon={faEdit} className='absolute right-20 lg:right-50  bottom-0' onClick={editClicked}/>
              <input type="file" id='inputbox' className='hidden' onChange={(e)=>{updateProfileImg(e)}}/>

              </div>
              
              }
              
           
            </div>
            <div className='bg-gray-200 py-7 rounded-3xl relative'>
                 <h1 className='text-3xl py-2 px-10 font-medium hover:bg-white w-fit rounded-2xl  lg:text-4xl'>{user?.name}</h1>
                 <h1 className='text-2xl py-2 px-10  hover:bg-white w-fit rounded-2xl lg:text-3xl'>{user?.idno}</h1>
                 <h1 className='text-2xl py-2 px-10  hover:bg-white w-fit rounded-2xl lg:text-3xl '>{user?.phoneNumber}</h1>
                 <h1 className='text-2xl py-2 px-10  hover:bg-white w-fit rounded-2xl lg:text-3xl'>{user?.collegeName}</h1>
                 <h1 className='text-1xl py-2 px-10 font-light hover:bg-white w-fit rounded-2xl lg:text-2xl '>{user?.address}</h1>
                 <FontAwesomeIcon icon={faEdit} className='absolute right-7  bottom-5'/>
            </div>
        </div>
        
      

    </div>
  )
}

export default Profile