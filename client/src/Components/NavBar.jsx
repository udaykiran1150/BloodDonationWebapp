import React, { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faUser } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../Context/Context";
import "./NavBar.css";

const NavBar = () => {
  const { logout } = useContext(userContext);
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const [showLogout, setShowLogout] = useState(false);

  function myFunction() {
    menuRef.current.classList.toggle("change");
    navRef.current.classList.toggle("hide");
    console.log("clicked");
  }

  return (
    <div>
      <div className="bg-gray-200   py-4 px-4 flex justify-between items-center overflow-hidden">
        <FontAwesomeIcon
          icon={faDroplet}
          className="text-red-600 text-4xl md:ml-16 ml-10"
        />
        <ul className="gap-16 md:flex hidden">
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/">My History</a>
        </ul>
        <div className="relative">
          <div
            className="px-3 py-3 rounded-full hover:bg-gray-200 lg:mr-0 mr-10 cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FontAwesomeIcon icon={faUser} />
          </div>

          {showLogout && (
            <div
              className="absolute md:right-10 top-5  right-20 px-6 py-2 bg-amber-100 rounded-xl shadow-md"
              onClick={logout}
            >
              Logout
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden block absolute top-4 right-4 z-50">
        <div className="container" ref={menuRef} onClick={myFunction}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className="bg-gray-100 w-0 h-screen fixed top-0 left-0  pt-20 z-40 transition-all duration-300 overflow-hidden"
        ref={navRef}
      >
        <ul className="flex flex-col h-full justify-center gap-6 items-center text-4xl">
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/">My History</a>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
