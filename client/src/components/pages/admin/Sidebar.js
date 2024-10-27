import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import logo from "./logo.png";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  MdDashboard,
  MdPersonAdd,
  MdManageAccounts,
  MdEdit,
  MdLogout,
} from "react-icons/md"; // New icons
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaBook,
  FaBullhorn,
} from "react-icons/fa"; // Additional icons

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [showstudent, setstudent] = useState(false);
  const [showbooks, setBooks] = useState(false);
  const [showspend, setSpend] = useState(false);
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
    setSpend(false);
  };

  const togglestudent = () => {
    closeAll();
    setstudent(!showstudent);
  };

  const togglebooks = () => {
    closeAll();
    setBooks(!showbooks);
  };

  const togglespend = () => {
    closeAll();
    setSpend(!showspend);
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
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white "
          >
            <MdDashboard className="mr-2" /> <span>Home</span>
          </Link>
        </li>
        <li className="">
          <Link
            to="/admin/admindash"
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white "
          >
            <MdDashboard className="mr-2" /> <span>Admin Dashboard</span>
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
                  to="/admin/createstaff"
                  className="sidebar-list-item text-white"
                >
                  <MdPersonAdd className="mr-2 mt-2" /> Add Student
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/manage-staff"
                  className="sidebar-list-item text-white"
                >
                  <MdManageAccounts className="mr-2 mt-2" /> Manage Student
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/studentpayment"
                  className="sidebar-list-item text-white"
                >
                  <FaMoneyBillWave className="mr-2 mt-2" /> Student Payment
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/managestudentpayment"
                  className="sidebar-list-item text-white"
                >
                  <FaShoppingCart className="mr-2 mt-2" /> Manage Payment
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/addfees"
                  className="sidebar-list-item text-white"
                >
                  <FaMoneyBillWave className="mr-2 mt-2" /> Add Fess Plan
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/manageplans"
                  className="sidebar-list-item text-white"
                >
                  <FaShoppingCart className="mr-2 mt-2" /> Manage Fees Plan
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
                  to="/admin/addcategory"
                  className="sidebar-list-item text-white"
                >
                  <MdPersonAdd className="mr-2 mt-2" /> Add Category
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/managecategory"
                  className="sidebar-list-item text-white"
                >
                  <MdManageAccounts className="mr-2 mt-2" /> Manage Category
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/addAuther"
                  className="sidebar-list-item text-white"
                >
                  <MdPersonAdd className="mr-2 mt-2" /> Add Author
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/manageAuther"
                  className="sidebar-list-item text-white"
                >
                  <MdManageAccounts className="mr-2 mt-2" /> Manage Author
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/addbook"
                  className="sidebar-list-item text-white"
                >
                  <MdPersonAdd className="mr-2 mt-2" /> Add Books
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/managebook"
                  className="sidebar-list-item text-white"
                >
                  <MdManageAccounts className="mr-2 mt-2" /> Manage Books
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/issuebook"
                  className="sidebar-list-item text-white"
                >
                  <MdPersonAdd className="mr-2 mt-2" /> Issue Books
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/manageissuebooks"
                  className="sidebar-list-item text-white"
                >
                  <MdManageAccounts className="mr-2 mt-2" /> Manage Issue Books
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/manageissuebooks"
                  className="sidebar-list-item text-white"
                >
                  <MdManageAccounts className="mr-2 mt-2" /> Order History Books 
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="px-0 py-2">
          <button
            onClick={togglespend}
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white p-1"
          >
            <FaMoneyBillWave className="mr-2 mt-2" /> <span>Spends</span>
            {!showspend ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showspend && (
            <ul className="ml-4">
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/addspend"
                  className="sidebar-list-item text-white"
                >
                  <MdPersonAdd className="mr-2 mt-2" /> Add Spend
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <Link
                  to="/admin/managespend"
                  className="sidebar-list-item text-white"
                >
                  <MdManageAccounts className="mr-2 mt-2" /> Manage Spend
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li onClick={closeSidebar}>
          <Link
            to="/admin/addnoticedheru"
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white"
          >
            <FaBullhorn className="mr-2 mt-2" /> Add Notice
          </Link>
        </li>
        <li onClick={closeSidebar}>
          <Link
            to="/admin/managenotice"
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white"
          >
            <FaBullhorn className="mr-2 mt-2" /> Manage Notice
          </Link>
        </li>
        <li onClick={closeSidebar}>
          <Link
            to="/admin/profileupdate"
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white"
          >
            <MdEdit className="mr-2 mt-2" /> Change Profile
          </Link>
        </li>
        <li onClick={closeSidebar}>
          <Link
            to="/admin/log-out"
            className="w-full sidebar-list-item flex items-center innerlist justify-left focus:outline-none text-white"
          >
            <MdLogout className="mr-2 mt-2" /> Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
