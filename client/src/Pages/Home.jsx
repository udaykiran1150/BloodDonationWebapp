// import React from 'react'
// import NavBar from '../Components/NavBar'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHandsHelping, faUser } from '@fortawesome/free-solid-svg-icons';
// const Home = () => {
//   return (
//     <div>
//       <NavBar/>

//       <div className='relative mt-[50vh] ml-[50vw] flex '>
//         <div className=''>
//           <FontAwesomeIcon icon={faHandsHelping} className='text-5xl'/>
//           Donars Portal</div>
//         <div>Organisers Portal</div>
//         <div>College Portal</div>
//       </div>

//     </div>
//   )
// }

// export default Home


import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faUserShield, faUniversity } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../Components/NavBar";

const Home = () => {
  return (
    <div className="flex flex-col justify-end">
      {/* Hero Section */}

      {/* Three Div Sections (Donor, Organizer, College) */}
      <section className="py-16 px-6 sm:px-12 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
          {/* Donor Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="text-6xl text-red-500 mb-4">
              <FontAwesomeIcon icon={faHandHoldingHeart} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Donor</h3>
            <p className="text-gray-700">
              Be a lifesaver by donating blood. Join our community of donors and make an impact.
            </p>
          </div>

          {/* Organizer Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="text-6xl text-blue-500 mb-4">
              <FontAwesomeIcon icon={faUserShield} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Organizer</h3>
            <p className="text-gray-700">
              Help organize donation camps and make blood donation drives a success in your area.
            </p>
          </div>

          {/* College Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="text-6xl text-yellow-500 mb-4">
              <FontAwesomeIcon icon={faUniversity} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">College</h3>
            <p className="text-gray-700">
              Collaborate with local organizations to create a blood donation ecosystem within colleges.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center mt-32 relative w-full bottom-0 ">
        <p>&copy; 2025 Blood Donation Initiative | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
