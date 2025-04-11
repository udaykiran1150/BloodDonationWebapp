import React, { useContext, useState,useEffect } from 'react'
import NavBar from '../Components/NavBar'
import createPostIcon from '../assets/createPostIcon.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { userContext } from '../Context/Context';
import axios from 'axios';
import Loader2 from '../Components/Loader2';
import Spinner from '../Components/Spinner'


const Organiser = () => {
  const [showbox,setShowbox]=useState(false);
  const {user,getWhoLoogedIn}=useContext(userContext)
  const [description,setDescription]=useState()
  const [donors,setDonors]=useState()
  const [isLoading,setIsLoading]=useState(false)


   useEffect(()=>
    {
      const init = async () => {
        await getWhoLoogedIn(); 
      };
      init();
    },[])

    useEffect(()=>{
      if(!user?.collegeName) return ;
      const temp=async()=>
      {
          try {
            setIsLoading(true)
            const response=await axios.post("http://localhost:3000/college/get-donor-organiser",{collegeName:user?.collegeName},{withCredentials:true})
            console.log(response)
            setIsLoading(false)
            setDonors(response.data.donars)
          } catch (error) {
            console.log(error)
          }
      }
      temp();
         
    },[user])

  const create=()=>
  { 
    setShowbox(prev=>(prev==false?true:false))
    console.log(showbox);
  }

  const sendPost=async()=>
  {
           try {
            
              const response=await axios.post("http://localhost:3000/college/createpost",{description,organiserId:user?._id,collegeName:user?.collegeName},
                {withCredentials:true})
                
           } catch (error) {
              console.log(error)
           }
  }
    

      
  return (
    <div className='md:px-0 px-3'>

        <NavBar/>

        <div className='mt-22 ml-6'>

          <h1>{user?.name}</h1>
            <h1 className='text-2xl md:text-4xl '>Donars In Your Campus</h1>


            {
              isLoading? <div className='w-full  flex mt-4 justify-center items-center'> <Spinner/> </div> : 

              <div className='grid  md:grid-cols-3 md:px-4 mx-auto grid-cols-1 gap-4 mt-10  lg:grid-cols-4 '>
                 {
                   donors?.map((donar)=>(
                    <div className='bg-[#FFB6C1] px-8 py-4 rounded-3xl cursor-pointer ' key={donar?._id}>
                      
                       <h1>{donar?.name}</h1>
                       <h1>{donar?.id}</h1>
                       <h1>{donar?.email}</h1>
                       <h1>{donar?.phoneNumber}</h1>
                       <h1>{donar?.address}</h1>

                    </div>
                   ))
                 }
            </div>
            }
            
        </div>

        <div className='mt-6 ml-5'>
            <div className='flex gap-2 bg-blue-400  px-3 w-30 py-3 rounded-4xl text-white' onClick={create}>
                <button >Creat Post</button>
                  <div>+</div>
            </div>
                <div className={`bg-[#cccccc75] mt-4 flex flex-col md:w-100 relative py-3 rounded-3xl   ${showbox ? "block" : "hidden"}`}>
                <FontAwesomeIcon icon={faXmark}  className='absolute right-0 mr-3 font-light text-gray-700  hover:cursor-pointer' onClick={create}/>

                <textarea  className='h-[30vh] mt-5 rounded-3xl px-3 py-2 outline-0  text-gray-700' row="10" cols="30"
                 onChange={(e)=>{setDescription(e.target.value)}}
                />

                  <div className='absolute bottom-0 right-0 hover:bg-gray-400 hover:cursor-pointer rounded-full ' >
                    <img src={createPostIcon} className='h-10 w-10'alt="" onClick={sendPost} />
                  </div>
                </div>
                
           

        </div>


      

        <footer className="bg-gray-800 text-white py-8 text-center mt-32 relative w-full bottom-0 ">
        <p>&copy; 2025 Blood Donation Initiative | All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default Organiser