import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../Components/NavBar';
import AutoImageSlider from '../Components/AutoImageSlider';
import {userContext} from '../Context/Context.jsx'
import Loader1 from '../Components/Loader1.jsx';
const Donars = () => {
  const {user,getWhoLoogedIn,DcolegeId,setDcollegeId,CurrentColleg,setCurrentCollege,getCurrentCollegeId,getPostsByCollegName ,posts,DisLoading}=useContext(userContext)
  useEffect(()=>
  {
    const init = async () => {
      await getWhoLoogedIn(); 
    };
    init();
  },[])

 

  return (
    <div className='bg-white md:px-0 px-3 overflow-hidden'>
      <NavBar/>
       <h1 className='text-3xl text-center'> welcome {user?.name.toUpperCase()} From {user?.collegeName}</h1>
      <AutoImageSlider/>
      <h2 className='md:text-4xl md:ml-14 mt-3 ml-10 text-red-500 text-2xl'>Posts By Your Organiser</h2>
          
          <div>
            {
              DisLoading? <div className='w-full text-center  justify-center items-center flex mt-10'> <Loader1/> </div>
            
                :<div>
                    {posts?.length>0 ?<div className='grid  md:grid-cols-3 md:px-4 mx-auto grid-cols-1 gap-4 mt-10  lg:grid-cols-4'>
                    {
                      posts?.map((post)=>(
                        
                        <div key={post._id} className='bg-[#FFB6C1] px-8 py-4 rounded-3xl cursor-pointer flex flex-col gap-6'>
                          <div className='flex  w-full items-center  gap-4'>
                            
                          <img src={post?.organiserId.img} alt=""  className='w-10 h-10 rounded-full'/>
                          <h2 className='text-2xl font-medium'>{post?.organiserId.name}</h2>
                          </div>
                          
                          {post.description}
                          </div>
                      ))
                    }
                    
                    </div> :<h1 className='lg:text-4xl text-2xl text-center mt-10 text-gray-500'>No Posts available</h1>}
                </div>
                }
          </div>
     

      <footer className="bg-gray-800 text-white py-8 text-center mt-32 realtive w-full bottom-0 ">
        <p>&copy; 2025 Blood Donation Initiative | All Rights Reserved</p>
      </footer>

    </div>
  );
};

export default Donars;
