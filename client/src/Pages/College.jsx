import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { userContext } from "../Context/Context";
import axios from "axios";

const College = () => {
  const { user, getWhoLoogedIn, posts } = useContext(userContext);

  let [donors,setDonors]=useState()
  const  [organisers,setOrganisers]=useState();
  useEffect(() => {
    const init = async () => {
      await getWhoLoogedIn();
    };
    init();
  }, []);

  useEffect(() => {
    const temp = async () => {
      try {
        const reponse = await axios.post(
          "http://localhost:3000/college/get-donor-organiser",
          { collegeName: user?.collegeName },
          { withCredentials: true }
        );
        setDonors(reponse.data.donars)
        setOrganisers(reponse.data.organisers)
        console.log(reponse)
      } catch (error) {
        console.log(error);
      }
    };
    temp();
  }, [user]);

  

  

  return (
    <div className="md:px-0 px-3">
      <NavBar />
      <img
        src="https://www.rguktong.ac.in/svgs/carosel/ssn.png"
        className="w-full"
        alt=""
      />

      <h1 className="text-4xl mt-8 px-4">
        Welcome Admin of {user?.collegeName}
      </h1>
      <div className="mt-22 ml-6">
        <h1 className="text-2xl md:text-4xl ">Donars In Your Campus</h1>
        <div className="grid  md:grid-cols-3 md:px-4 mx-auto grid-cols-1 gap-4 mt-10  lg:grid-cols-4 ">
          {donors?.map((donar) => (
            <div
              className="bg-[#FFB6C1] px-8 py-4 rounded-3xl cursor-pointer flex flex-col gap-3 "
              key={donar._id}
            >
               <div className='flex  w-full items-center  gap-4'>
                      
                      <img src={donar?.img} alt=""  className='w-10 h-10 rounded-full'/>
                      <h2 className='text-2xl font-medium'>{donar?.name}</h2>
              </div>
              <h1>{donar?.id}</h1>
              <h1>{donar?.email}</h1>
              <h1>{donar?.phoneNumber}</h1>
              <h1>{donar?.address}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-22 ml-6">
        <h1 className="text-2xl md:text-4xl ">Organisers In Your Campus</h1>
        <div className="grid  md:grid-cols-3 md:px-4 mx-auto grid-cols-1 gap-4 mt-10  lg:grid-cols-4 ">
          {organisers?.map((donar) => (
            <div
              className="bg-amber-200 px-4 py-4 rounded-3xl cursor-pointer  flex flex-col  gap-3"
              key={donar._id}
            >
              <div className='flex  w-full items-center  gap-4'>
                      
                      <img src={donar?.img} alt=""  className='w-10 h-10 rounded-full'/>
                      <h2 className='text-2xl font-medium'>{donar?.name}</h2>
              </div>
                      
              <h1>{donar?.idno}</h1>
              <h1>{donar?.email}</h1>
              <h1>{donar?.phoneNumber}</h1>
              
            </div>
          ))}
        </div>
      </div>

      <div className="mt-22 ml-6">
        <h1 className="text-2xl md:text-4xl  mt-4">
          Posts By Organiser Campus
        </h1>
        <div className="grid  md:grid-cols-3 md:px-4 mx-auto grid-cols-1 gap-4 mt-10  lg:grid-cols-4 ">
          {posts?.map((post) => (
            <div
              className="bg-green-200  px-8 py-4 rounded-3xl cursor-pointer  flex flex-col gap-4"
              key={post._id}
            >
              {/* <h1>{posts?.name}</h1> */}
              <div className='flex  w-full items-center  gap-4'>
                      
                    <img src={post?.organiserId.img} alt=""  className='w-10 h-10 rounded-full'/>
                    <h2 className='text-2xl font-medium'>{post?.organiserId.name}</h2>
              </div>

              <p>{post?.description}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 text-center mt-32 relative w-full bottom-0 ">
        <p>&copy; 2025 Blood Donation Initiative | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default College;
