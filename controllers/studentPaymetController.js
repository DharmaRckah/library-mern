import studentPaymentModel from "../models/studentPaymentModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit per file
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|bmp|tiff|tif|webp|heic|heif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
}).array("img", 10); // 'img' corresponds to the field name in your form data, 10 is the max count


export const createStudentPaymentController = async (req, res) => {
    try {
      // Handle file upload
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).send({ error: "Multer error", message: err.message });
        } else if (err) {
          return res.status(500).send({ error: "Server error", message: err.message });
        }
  
        // Files uploaded successfully, proceed to create student payment
        const { name, fatherName, contact, email, address, pincode, state, paymentDate, paymentMethod, amount, description, userId,staffid } = req.body;
        
        const img = req.files ? req.files.map((file) => file.path) : [];
  
        try {
          const newStudentPayment = new studentPaymentModel({
            name,
            fatherName,
            contact,
            email,
            address,
            pincode,
            state,
            paymentDate,
            paymentMethod,
            amount,
            description,
            img,
            admin: userId,
            staff:staffid,
          });
          const savedPayment = await newStudentPayment.save();
          res.status(201).send({ message: "Student payment added successfully", payment: savedPayment });
        } catch (error) {
          res.status(500).send({ error: "Server error", message: error.message });
        }
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  };
  

export const manageStudentPaymentController = async (req, res) => {
  try {
    const _id = req.params._id;
    const data = await studentPaymentModel.find({admin:_id});
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

export const manageStudentByStffIdPaymentController = async (req, res) => {
  try {
    const _id = req.params._id;
    const data = await studentPaymentModel.find({staff:_id});
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
export const deleteStudentPaymentController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await studentPaymentModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Student payment not found" });
    }

    return res.status(200).send({
      success: true,
      message: "student Payment deleted successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

export const updateStudentPaymentController = async (req, res) => {
    try {
      // Handle file upload
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).send({ error: "Multer error", message: err.message });
        } else if (err) {
          return res.status(500).send({ error: "Server error", message: err.message });
        }
  
        // Files uploaded successfully, proceed to update student payment
        const { name, fatherName, contact, email, address, pincode, state, paymentDate, paymentMethod, amount, description } = req.body;
  
        const img = req.files ? req.files.map((file) => file.path) : [];
  
        try {
          const updatedPayment = await studentPaymentModel.findByIdAndUpdate(
            req.params.id,
            {
              name,
              fatherName,
              contact,
              email,
              address,
              pincode,
              state,
              paymentDate,
              paymentMethod,
              amount,
              description,
              img: img.length ? img : undefined, 
            },
            { new: true }
          );
  
          if (!updatedPayment) {
            return res.status(404).send({ message: "Student payment not found" });
          }
  
          res.status(200).send({ message: "Student payment updated successfully", payment: updatedPayment });
        } catch (error) {
          res.status(500).send({ error: "Server error", message: error.message });
        }
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  };