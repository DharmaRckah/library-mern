import React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../pages/admin/Header'
import Home from '../pages/admin/Home'
import Sidebar from '../pages/admin/Sidebar'
import Test from './Test'


import Logout from '../pages/admin/Logout.js'
import CreateStaff from '../pages/admin/student/CreateStaff.js'
import ViewStaff from '../pages/admin/student/ViewStaff.jsx'
import StudentPayment from '../pages/admin/student/StudentPayment.jsx'
import ManageStudentPayment from '../pages/admin/student/ManageStudentPayment.js'
import AddSpend from '../pages/admin/spend/AddSpend.jsx'
import ManageSpend from '../pages/admin/spend/ManageSpend.jsx'
import AddCategory from '../pages/admin/book/Addcategory.js'
import ManageCategory from '../pages/admin/book/ManageCategory.js'
import AddAuther from '../pages/admin/book/AddAuther.js'
import ManageAuther from '../pages/admin/book/ManageAuther.js'
import AddBook from '../pages/admin/book/AddBook.js'
import ManageBooks from '../pages/admin/book/ManageBooks.js'
import SignUp from '../auth/ProfileUpdate.js'
import AddNotice from '../pages/admin/notice/ManageNotice.js'
import ManageNotice from '../pages/admin/notice/ManageNotice.js'
import Notice from '../pages/admin/notice/Notice.js'
import AddLibraryFees from '../pages/admin/student/AddLibraryFees.js'
import ManagePlans from '../pages/admin/student/ManagePlans.js'
import IssueBook from '../pages/admin/book/IssueBook.js'
import ManageIssuedBooks from '../pages/admin/book/ManageIssuedBooks.js'

const AdminRoute = () => {
 

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admindash" element={<Home />} />
        {/* <Route path="/dash" element={<Home />} /> */}

        <Route path="/*" element={<Test />} />
        <Route path="manage-staff" element={<ViewStaff />} />
        <Route path="createstaff" element={<CreateStaff />} />
        <Route path="studentpayment" element={<StudentPayment />} />
        <Route path="managestudentpayment" element={<ManageStudentPayment />} />
        <Route path="addspend" element={<AddSpend />} />
        <Route path="managespend" element={<ManageSpend />} />
        <Route path="addcategory" element={<AddCategory />} />
        <Route path="managecategory" element={<ManageCategory />} />
        <Route path="addAuther" element={<AddAuther />} />
        <Route path="manageAuther" element={<ManageAuther />} />
        <Route path="addbook" element={<AddBook />} />
        <Route path="managebook" element={<ManageBooks />} />
        <Route path="profileupdate" element={<SignUp />} />
        <Route path="addnoticedheru" element={<Notice />} />
        <Route path="managenotice" element={<ManageNotice />} />
        <Route path="addfees" element={<AddLibraryFees />} />
        <Route path="manageplans" element={<ManagePlans />} />
        <Route path="issuebook" element={<IssueBook />} />
        <Route path="manageissuebooks" element={<ManageIssuedBooks />} />
        <Route path="log-out" element={<Logout />} />
      </Routes>
    </div>
  )
}

export default AdminRoute
