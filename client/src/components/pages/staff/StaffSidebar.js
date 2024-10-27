import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import logo from "./logo.png";
import { useAuth } from "../../context/Auth";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  MdDashboard,
  MdPersonAdd,
  MdManageAccounts,
  MdEdit,
  MdLogout,
} from "react-icons/md";
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaBook,
  FaBullhorn,
} from "react-icons/fa";
function StaffSidebar({ openSidebarToggle, OpenSidebar }) {
  const [auth] = useAuth();
  const [showstudent, setstudent] = useState(false);
  const [showbooks, setBooks] = useState(false);
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        openSidebarToggle
      ) {
        OpenSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSidebarToggle, OpenSidebar]);
  const closeSidebar = () => {
    if (openSidebarToggle) {
      OpenSidebar();
    }
  };
  const closeAll = () => {
    setstudent(false);
    setBooks(false);
  };
  const togglestudent = () => {
    closeAll();
    setstudent(!showstudent);
  };
  const togglebooks = () => {
    closeAll();
    setBooks(!showbooks);
  };
  return (
    <aside
      ref={sidebarRef}
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive " : " p-2"}
    >
      <div className="sidebar-title ">
        <div className="flex justify-left items-center  gap-5">
          <Link to="/">
            <div className="flex items-center">
              <img src={logo} alt="Company Logo" className="h-16" />
              <h1 className="bg-gradient-to-r from-red-500 to-blue-500 via-orange-500 via-yellow-500 to-white bg-clip-text text-transparent text-5xl font-bold">
                𝕊𝕍ℕ
              </h1>
            </div>
          </Link>
        </div>
        <span
          className="icon close_icon border text-white"
          onClick={OpenSidebar}
          style={{ color: "white", fontSize: "24px" }}
        >
          <IoMdClose />
        </span>
      </div>
      <ul className="sidebar-list">
        {/* Dashboard */}
        <li className="">
          <Link
            to="/"
            className="w-full flex sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white "
          >
            <MdDashboard className="mr-2" />{" "}
            <span className="text-nowrap">Home</span>
          </Link>
        </li>
        <li className="">
          <Link
            to="/staff/dash"
            className="w-full flex sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white "
          >
            <MdDashboard className="mr-2" />{" "}
            <span className="text-nowrap">Student Dashboard</span>
          </Link>
        </li>

        <li className="px-0 py-2">
          <button
            onClick={togglestudent}
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white p-1"
          >
            <FaUsers className="mr-2 mt-2" /> <span>Student</span>
            {!showstudent ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showstudent && (
            <ul className="ml-4">
              <li onClick={closeSidebar}>
                <Link
                  to="/staff/studentpayment"
                  className="sidebar-list-item text-white"
                >
                  <FaMoneyBillWave className="mr-2 mt-2" /> Student Payment
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/staff/managestudentpayment"
                  className="sidebar-list-item text-white"
                >
                  <FaShoppingCart className="mr-2 mt-2" /> Manage Payment
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/staff/manageplans"
                  className="sidebar-list-item text-white"
                >
                  <FaShoppingCart className="mr-2 mt-2" /> Fees Plan
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="px-0 py-2">
          <button
            onClick={togglebooks}
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white p-1"
          >
            <FaBook className="mr-2 mt-2" /> <span>Books</span>
            {!showbooks ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showbooks && (
            <ul className="ml-4">
              <li onClick={closeSidebar}>
                <Link
                  to="/staff/issuebook"
                  className="sidebar-list-item text-white"
                >
                  <MdPersonAdd className="mr-2 mt-2" /> Books Collections
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/staff/manageissuebooks"
                  className="sidebar-list-item text-white"
                >
                  <MdManageAccounts className="mr-2 mt-2" /> Issue Books
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li onClick={closeSidebar}>
          <Link
            to="/staff/managenotice"
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white"
          >
            <FaBullhorn className="mr-2 mt-2" /> Notice Board
          </Link>
        </li>
        <li onClick={closeSidebar}>
          <Link
            to="/staff/profileupdate"
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white"
          >
            <MdEdit className="mr-2 mt-2" /> Change Profile
          </Link>
        </li>
        <li onClick={closeSidebar}>
          <Link
            to="/staff/log-out"
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white"
          >
            <MdLogout className="mr-2 mt-2" /> Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default StaffSidebar;
