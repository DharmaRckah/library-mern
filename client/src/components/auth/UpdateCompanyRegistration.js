import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Country, State } from "country-state-city";
import { useAuth } from "../context/Auth.js";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  photo: "",
  businessName: "",
  address: "",
  country: "",
  state: "",
  pinCode: "",
  email: "",
  website: "",
  contact: "",
  financialYear: "",
  bookFrom: "",
  enable_gst: "",
  s_state: "",
  registration_Type: "",
  tax_Rate: "",
  gstIn: "",
  drug_licence_no: "",
  othertax: "",
  tax_name: "",
  number: "",
  bank_name: "",
  bank_addess: "",
  ifce_code: "",
  account_holder_name: "",
  accountNumber: "",
  upiId: "",
};

const UpdateCompanyRegistration = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [photo, setPhoto] = useState([]);
  const [auth] = useAuth(); // Get auth context
  const navigate = useNavigate();

  // Fetch existing company data and set it to formData
 const [_id,setId]=useState("")
  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`/api/v1/company/get/${auth.user._id}`);
      console.log("companyResponse", response.data);
      setId(response.data.data._id)
      console.log(response.data.data._id,"dheeru id")
      setFormData({
        ...response.data.data,
        bookFrom: response.data.data.bookFrom.substring(0, 10), // Format date if needed
      });
    } catch (error) {
      console.error("Error fetching company data", error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    const country = countries.find((c) => c.isoCode === countryCode);
    setFormData({ ...formData, country: country ? country.name : "" });
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);

    const state = states.find((s) => s.isoCode === stateCode);
    setFormData({ ...formData, state: state ? state.name : "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "registration_Type" && value === "false") {
      setFormData((prevData) => ({
        ...prevData,
        tax_Rate: "",
      }));
    }
  };

  const handleGSTStateChange = (e) => {
    const stateCode = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      s_state: stateCode,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
      }));
    } else {
      console.error("No file selected or error in selecting file.");
    }
  };
 const admin=auth.user._id;
  const userId = auth.user._id; // Get the userId from the auth context
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    // Append all form data except the photo
    for (let key in formData) {
      if (formData[key] !== undefined && key !== "photo") {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    // Append the photo if it exists
    if (formData.photo && formData.photo instanceof File) {
      formDataToSend.append("photo", formData.photo);
    }
  
    // Append the admin ID
    formDataToSend.append("admin", userId);
  
    try {
        console.log(`/api/v1/company/update/${_id} dsss`)
      const response = await axios.put(
        `/api/v1/company/update/${_id}`,
        formDataToSend,
      );
  
      if (response.data.success) {
        toast.success(`${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating company:", error.response ? error.response.data : error.message);
      toast.error(
        `There was an error updating the company: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };
  
  const clearData = () => {
    setFormData(initialFormData);
  };

  const photoInputRef = useRef(null);

  return (
    <form
      className="responsive-container  p-8 border border-gray-300 shadow-lg rounded-lg bg-white"
      onSubmit={handleSubmit}
    >
      <h4 className="text-3xl font-semibold mb-4 text-center underline mb-6 text-violet-800">
      Update  Set Up Business
      </h4>
      <div className="font-bold underline">Business Information </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <label className="block mb-2 font-bold">
          Logo:
          <input
            type="file"
            name="photo" // This name should match the Multer field name
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>

        <label className="block mb-2 font-bold">
          Business Name
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
        <label className="block mb-2 font-bold">
          Address
          <textarea
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>

        <label className="block mb-2 font-bold">
          Country
          <select
            name="country"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2 font-bold">
          State
          <select
            name="state"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-2 font-bold">
          Pin code
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>

        <label className="block mb-2 font-bold">
          Email Id
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
        <label className="block mb-2 font-bold">
          Website
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
        <label className="block mb-2 font-bold">
          Phone number
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
        <label className="block mb-2 font-bold">
          financialYear
          <input
            type="text"
            name="financialYear"
            value={formData.financialYear}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
        <label className="block mb-2 font-bold">
          Books Begining From
          <input
            type="date"
            name="bookFrom"
            value={formData.bookFrom}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
      </div>
      <div className="font-bold underline">Statutory Details </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <label className="block mb-2 font-bold">
          Enable GST
          <select
            name="enable_gst"
            value={formData.enable_gst}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        {formData.enable_gst === "true" && (
          <>
            <label className="block mb-2 font-bold">
              GST State
              <select
                name="s_state"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                value={formData.s_state}
                onChange={handleGSTStateChange} // This handles the GST-specific state
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-2 font-bold">
              Registration Type
              <select
                name="registration_Type"
                value={formData.registration_Type}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                <option value="">Select</option>
                <option value="Regular">Regular</option>
                <option value="Composition">Composition</option>
              </select>
            </label>

            {/* Conditionally render the Tax Rate input if 'Composition' is selected */}
            {formData.registration_Type === "Composition" && (
              <label className="block mb-2 font-bold">
                Tax Rate
                <input
                  type="text"
                  name="tax_Rate"
                  value={formData.tax_Rate}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
            )}

            <label className="block mb-2 font-bold">
              GSTIN
              <input
                type="text"
                name="gstIn"
                value={formData.gstIn}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>

            {/* end */}

            <label className="block mb-2 font-bold">
              Drug Licence No.
              <input
                type="text"
                name="drug_licence_no"
                value={formData.drug_licence_no}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>

            <label className="block mb-2 font-bold">
              Other Tax
              <select
                name="othertax"
                value={formData.othertax}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            {formData.othertax === "true" && (
              <>
                <label className="block mb-2 font-bold">
                  Tax Name
                  <input
                    type="text"
                    name="tax_name"
                    value={formData.tax_name}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                  />
                </label>

                <label className="block mb-2 font-bold">
                  Number
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                  />
                </label>
              </>
            )}
          </>
        )}
      </div>

      <div className="font-bold underline">Bank Details</div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <label className="block mb-2 font-bold">
          Bank Name
          <input
            type="text"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>

        <label className="block mb-2 font-bold">
          Bank Address
          <textarea
            type="text"
            name="bank_addess"
            value={formData.bank_addess}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>

        <label className="block mb-2 font-bold">
          IFSC Code
          <input
            type="text"
            name="ifce_code"
            value={formData.ifce_code}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>

        <label className="block mb-2 font-bold">
          Account Holder Name
          <input
            type="text"
            name="account_holder_name"
            value={formData.account_holder_name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
        <label className="block mb-2 font-bold">
          Account Number
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
        <label className="block mb-2 font-bold">
          UPI ID
          <input
            type="text"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
          />
        </label>
      </div>
      <div onClick={handleSubmit} className="flex justify-center item-center ">
        <button className="bg-green-500 p-2 pl-5 pr-5 rounded">Update Set Up Business </button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default UpdateCompanyRegistration;
