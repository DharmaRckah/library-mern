import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../pages/admin/Header";
import Home from "../pages/admin/Home";

import Test from "./Test";
import { useAuth } from "../context/Auth";
import Logout from "../pages/admin/Logout.js";
import StaffSidebar from './../pages/staff/StaffSidebar';
import ManageIssuedBooks from "../pages/admin/book/ManageIssuedBooks.js";
import IssueBook from "../pages/admin/book/IssueBook.js";


import SignUp from "../auth/ProfileUpdate.js";


import StudentPayment from "../pages/staff/StudentPayment.jsx";
import ManageStudentPayment from "../pages/staff/ManageStudentPayment.js";
import ManagePlans from "../pages/staff/ManagePlans.js";
import ManageNotice from "../pages/staff/ManageNotice.js";
import ProfileUpdate from "../pages/staff/ProfileUpdate.js";

const StaffRoute = () => {
  const [auth] = useAuth();

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <StaffSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dash" element={<Home />} />
        <Route path="/*" element={<Test />} />
        <Route path="studentpayment" element={<StudentPayment/>} />
        <Route path="managestudentpayment" element={<ManageStudentPayment />} />
        <Route path="profileupdate" element={<ProfileUpdate />} />
        <Route path="managenotice" element={<ManageNotice />} />
        <Route path="manageplans" element={<ManagePlans />} />
        <Route path="issuebook" element={<IssueBook />} />
        <Route path="manageissuebooks" element={<ManageIssuedBooks />} />      
        <Route path="log-out" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default StaffRoute;
