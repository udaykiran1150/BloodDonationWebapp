import React, { useContext } from "react";
import Home from "./Pages/Home.jsx";
import Organiser from "./Pages/Organiser.jsx";
import Test from "./Test.jsx";
import UploadImage from "./Components/UploadImage.jsx";
import College from "./Pages/College.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Donar from "./Pages/Donars.jsx";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import Profile from "./Pages/Profile.jsx";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoutes from "./Context/ProtectedRoutes.jsx";
import { userContext } from "./Context/Context.jsx";
import Loader1 from "./Components/Loader1.jsx";
import Unauthorized from "./Pages/Unauthorized.jsx";

const App = () => {
  const { user } = useContext(userContext);

  return (
    <div className="bg-gray-100">
      <ToastContainer />

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/donar"
          element={
            <ProtectedRoutes roles={["donar"]}>
              <Donar />
            </ProtectedRoutes>
          }
        />
        <Route path="/organiser" element={
          
          <ProtectedRoutes roles={['organiser']}>
            <Organiser />
          </ProtectedRoutes>}
           />

        <Route path="/college" element={
          <ProtectedRoutes roles={['college']}>
              <College />
          </ProtectedRoutes>
          } />

        <Route path="/profile" element={<Profile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      {/* <Home/> */}

      {/* <Donars/> */}
      {/* <Organiser/> */}
      {/* <College/> */}
      {/* <SignUp/> */}
    </div>
  );
};

export default App;
