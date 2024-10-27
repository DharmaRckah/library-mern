import companyModel from "../models/companyModel.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "./uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize Multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|jfif|bmp|webp|svg|tiff|tif|ico|heif|heic/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          `Error: Invalid file type! Only images are allowed. Your file type: ${file.mimetype}`
        )
      );
    }
  },
}).single("photo"); // Ensure this matches the name attribute in the frontend

export const registerController = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .send({ error: "Multer error", message: err.message });
      } else if (err) {
        return res
          .status(400)
          .send({ error: "File upload error", message: err.message });
      }
      const {
        admin,
        businessName,
        address,
        country,
        state,
        pinCode,
        email,
        website,
        contact,
        financialYear,
        bookFrom,
        enable_gst,
        s_state,
        registration_Type,
        tax_Rate,
        gstIn,
        drug_licence_no,
        othertax,
        tax_name,
        number,
        bank_name,
        bank_addess,
        ifce_code,
        account_holder_name,
        accountNumber,
        upiId,
      } = req.body;

      // const { _id } = req.user;

      const photo = req.file ? req.file.path.replace(`${uploadDir}`, "") : null;

      // Check if the business already exists
      const old = await companyModel.findOne({ businessName, email });
      if (old) {
        return res.status(400).send({
          success: false,
          message: "This business already exists",
        });
      }

      // Create a new company with the uploaded image
      const data = await companyModel.create({
        admin,
        photo, // Only relative path is saved here
        businessName,
        address,
        country,
        state,
        pinCode,
        email,
        website,
        contact,
        financialYear,
        bookFrom,
        enable_gst,
        s_state,
        registration_Type,
        tax_Rate,
        gstIn,
        drug_licence_no,
        othertax,
        tax_name,
        number,
        bank_name,
        bank_addess,
        ifce_code,
        account_holder_name,
        accountNumber,
        upiId,
      });
      console.log(data, "response dh");
      return res.status(201).send({
        success: true,
        message: "Company registration successful",
        data,
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const getController = async (req, res) => {
  try {
    const { admin } = req.params;
    const data = await companyModel.findOne({ admin });
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No company data found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Company data retrieved successfully",
      data,
    });
  } catch (error) {
    console.log("Error fetching company data:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
export const updateController = async (req, res) => {
  console.log("hitt")
  try {
    // Get the company ID from the request parameters
    // Use multer to handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          error: "Multer error",
          message: err.message,
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          error: "File upload error",
          message: err.message,
        });
      }

      // Destructure fields from the request body
      const {
        businessName,
        address,
        country,
        state,
        pinCode,
        email,
        website,
        contact,
        financialYear,
        bookFrom,
        enable_gst,
        s_state,
        registration_Type,
        tax_Rate,
        gstIn,
        drug_licence_no,
        othertax,
        tax_name,
        number,
        bank_name,
        bank_addess,
        ifce_code,
        account_holder_name,
        accountNumber,
        upiId,
      } = req.body;
     const {_id}=req.params;
      // Get the uploaded photo file path if a new photo was uploaded
      const photo = req.file ? req.file.filename : null;
      console.log(_id,"id")
      // Find the company to update
      const company = await companyModel.find({_id});

      console.log(company,"company")
      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }

      // Update company fields
      const updatedData = {
        photo: photo ? photo : company.photo, // Update photo only if a new one is uploaded
        businessName: businessName || company.businessName,
        address: address || company.address,
        country: country || company.country,
        state: state || company.state,
        pinCode: pinCode || company.pinCode,
        email: email || company.email,
        website: website || company.website,
        contact: contact || company.contact,
        financialYear: financialYear || company.financialYear,
        bookFrom: bookFrom || company.bookFrom,
        enable_gst: enable_gst || company.enable_gst,
        s_state: s_state || company.s_state,
        registration_Type: registration_Type || company.registration_Type,
        tax_Rate: tax_Rate || company.tax_Rate,
        gstIn: gstIn || company.gstIn,
        drug_licence_no: drug_licence_no || company.drug_licence_no,
        othertax: othertax || company.othertax,
        tax_name: tax_name || company.tax_name,
        number: number || company.number,
        bank_name: bank_name || company.bank_name,
        bank_addess: bank_addess || company.bank_addess,
        ifce_code: ifce_code || company.ifce_code,
        account_holder_name: account_holder_name || company.account_holder_name,
        accountNumber: accountNumber || company.accountNumber,
        upiId: upiId || company.upiId,
      };
       console.log(updatedData,"updateData")
      // Update the company in the database
      const updatedCompany = await companyModel.findByIdAndUpdate(
        _id,
        updatedData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Company updated successfully",
        data: updatedCompany,
      });
    });
  } catch (error) {
    console.error("Company Update Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
