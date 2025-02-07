
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
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const withNavBar = (Component) => (
  <>
    <NavigationBar />
    <Component />
  </>
);




const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const userType = localStorage.getItem("role");
  return (
    <Router>
      <Routes>

      <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={withNavBar(Register)} />
        <Route path="/login" element={withNavBar(Login)} />
        <Route path="/forgot-password" element={withNavBar(ForgotPassword)} />
        <Route path="/contact"element={<><ContactUs/> </>}/>
        <Route path="/PrivacyPolicy"element={<><PrivacyPolicy/> </>} />
        <Route path="/about" element={withNavBar(About)} />
        
        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoute/>}>
        <Route path="/UserDashboard"element={<> <UserDashboard /> </>}     />
        <Route path="/DocumentManagement"element={<><DocumentManagement /> </>}     />
        <Route path="/UserManagement"element={<> <UserManagement/> </>}     />
        <Route path="/AdminDashboard"element={<> <Dashboard/> </>}     />
        <Route path="/NavigationBar2"element={<><NavigationBar2/> </>} />     
        <Route path="/ProfilePage"element={<><ProfilePage/> </>}     />
        </Route>

      </Routes>
      
    </Router>
  );
};

export default App;
