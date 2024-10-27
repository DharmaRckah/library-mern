import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageBranches = () => {
  const [Branches, setBranches] = useState([]);
  const [selectedbranch, setSelectedbranch] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getBranches");
      setBranches(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openViewModal = (branch) => {
    setSelectedbranch(branch);
    setViewModal(true);
  };

  const openEditModal = (branch) => {
    setSelectedbranch(branch);
    setEditModal(true);
  };

  const closeModals = () => {
    setViewModal(false);
    setEditModal(false);
    setSelectedbranch(null);
  };

  const deletebranch = async (_id) => {
    try {
      await axios.delete(`/api/v1/auth/deleteBranch/${_id}`);
      toast.success("Branch deleted successfully");

      fetchBranches();
    } catch (error) {
      toast.error("Failed to delete branch");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `
        /api/v1/auth/updtaeBranches/${selectedbranch._id}`,
        selectedbranch
      );
      toast.success(" Branch updated successfully");
      fetchBranches();
      closeModals();
    } catch (error) {
      toast.error("Failed to update Sub branch");
    }
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Branches
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Branch Name
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Branch Id
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Location
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Address
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Contact
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Email Id
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Branches.length > 0 ? (
              Branches.map((branch, index) => (
                <tr key={branch._id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {branch.branchName}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {branch.branchId}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {branch.location}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {branch.address}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {branch.contact}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    {branch.emailId}
                  </td>
                  <td className="px-6 py-2 border-r text-sm text-nowrap">
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openViewModal(branch)}
                    >
                      View
                    </button>
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openEditModal(branch)}
                    >
                      Edit
                    </button>
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => deletebranch(branch._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-2 text-center text-sm">
                  No Branches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />

      {/* View Modal */}
      <Modal
        isOpen={viewModal}
        onRequestClose={closeModals}
        contentLabel="View branch Modal"
        style={{
          content: {
            width: "50%",
            height: "70%",
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">View Branch</h2>
          {selectedbranch && (
            <div>
              <p>
                <label className="block text-sm font-medium text-gray-700 ">
                  Branch Name
                </label>
                <span className="mt-1 mb-4 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {selectedbranch.branchName}
                </span>
                <label className="block text-sm font-medium text-gray-700">
                  Branch Id
                </label>
                <span className="mt-1 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {selectedbranch.branchId}
                </span>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <span className="mt-1 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {selectedbranch.location}
                </span>{" "}
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <span className="mt-1 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {selectedbranch.address}
                </span>{" "}
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <span className="mt-1 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {selectedbranch.contact}
                </span>{" "}
                <label className="block text-sm font-medium text-gray-700">
                  Email Id
                </label>
                <span className="mt-1 block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {selectedbranch.emailId}
                </span>
              </p>
            </div>
          )}

          <button
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
            onClick={closeModals}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal}
        onRequestClose={closeModals}
        contentLabel="Edit branch Modal"
        style={{
          content: {
            width: "50%",
            height: "80%",
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Branch</h2>
          {selectedbranch && (
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Branch Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedbranch.branchName}
                  onChange={(e) =>
                    setSelectedbranch({
                      ...selectedbranch,
                      branchName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Branch Id
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedbranch.branchId}
                  onChange={(e) =>
                    setSelectedbranch({
                      ...selectedbranch,
                      branchId: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedbranch.location}
                  onChange={(e) =>
                    setSelectedbranch({
                      ...selectedbranch,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </div>{" "}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedbranch.address}
                  onChange={(e) =>
                    setSelectedbranch({
                      ...selectedbranch,
                      address: e.target.value,
                    })
                  }
                  required
                />
              </div>{" "}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedbranch.contact}
                  onChange={(e) =>
                    setSelectedbranch({
                      ...selectedbranch,
                      contact: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Email Id
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedbranch.emailId}
                  onChange={(e) =>
                    setSelectedbranch({
                      ...selectedbranch,
                      emailId: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded mr-2"
                  onClick={closeModals}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default ManageBranches;
