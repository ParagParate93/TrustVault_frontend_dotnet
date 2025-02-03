
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage.jsx"; 
import 'bootstrap/dist/css/bootstrap.min.css';


import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import About from "./pages/About";
//import Dashboard from "./assets/Dashboard.jsx";
import UserDashboard from "./userDashboard/userDashboard.jsx"

import DocumentManagement  from "./adminDashboard/DocumentManagement.jsx";
import UserManagement from "./adminDashboard/UserManagement.jsx";
import Dashboard from "./adminDashboard/Dashboard.jsx";
import Footer from "./components/Footer.jsx";
import NavigationBar2 from "./components/NavigationBar2.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import PrivacyPolicy from "./pages/privacypolicy.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const withNavBar = (Component) => (
  <>
    <NavigationBar />
    <Component />
  </>
);




const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={withNavBar(Register)} />
        <Route path="/login" element={withNavBar(Login)} />
        <Route path="/forgot-password" element={withNavBar(ForgotPassword)} />
        <Route path="/about" element={withNavBar(About)} />
       
        <Route path="/UserDashboard"element={<> {/* Include Navbar here */}<UserDashboard /> </>}     />
        <Route path="/DocumentManagement"element={<> {/* Include Navbar here */}<DocumentManagement /> </>}     />
        <Route path="/UserManagement"element={<> {/* Include Navbar here */}<UserManagement/> </>}     />
        <Route path="/AdminDashboard"element={<> {/* Include Navbar here */}<Dashboard/> </>}     />

        <Route path="/NavigationBar2"element={<><NavigationBar2/> </>}     />
        <Route path="/contact"element={<><ContactUs/> </>}     />
        <Route path="/PrivacyPolicy"element={<><PrivacyPolicy/> </>}     />
        <Route path="/ProfilePage"element={<><ProfilePage/> </>}     />

      </Routes>
      
    </Router>
  );
};

export default App;
