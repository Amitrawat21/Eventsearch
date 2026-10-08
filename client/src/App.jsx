import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
 import EventDetail from "./pages/EventDetail/EventDetail.jsx";
import Login from "./pages/Login/Login.jsx";
 import Register from "./pages/Register/Register.jsx";
import UserDashboard from "./pages/UserDashboard/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboad/AdminDashboard.jsx";
import Foot from "./components/foot/Foot.jsx";
// import PaymentSuccess from "./pages/PaymentSuccess";
// import PaymentFailed from "./pages/PaymentFailed";
import "./App.css";

function App()
{
    return (
      <Router>
        <div className="app-shell">
          <Navbar />
          <main className="app-main containerr">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/foot" element={<Foot />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* <Route path="/dashboard" element={<UserDashboard />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                        <Route path="/payment-failed" element={<PaymentFailed />} />
                        <Route path="*" element={<h1 className="not-found-heading">404 - Page Not Found</h1>} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    );
}

    export default App
