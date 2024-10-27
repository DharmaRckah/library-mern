import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import { hashPassword, comparePassword } from "../middleware/authHelper.js";

import NodeCache from "node-cache";

import { isValidObjectId } from "mongoose";
import JWT from "jsonwebtoken";

const node_cache = new NodeCache({ stdTTL: 120 });

export const userRegisterController = async (req, res) => {
  try {
    const {
      businessName,
      userName,
      address,
      contact,
      email,
      password,
      businessType,
    } = req.body;

    const requiredField = [
      "businessName",
      "userName",
      "address",
      "contact",
      "email",
      "password",
      "businessType",
    ];

    const missingFields = [];
    for (const field of requiredField) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields,
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.send({ success: false, message: "password must be 6 digit" });
    }

    // otp

    function generateStrongOTP() {
      const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let otp = "";
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
      }
      return otp;
    }

    let otp = generateStrongOTP();
    const message =
      "Your OTP for verification is " +
      otp +
      " Please use this code to complete your Registration. Do not share it. ~dharma ";
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // check old user
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.send({ message: "user already exist" });
    }

    const subject = "OTP verification from accounting";
    let info = await transporter.sendMail({
      from: `Accounting Master <manasvistaff.dharma@gmail.com>`,
      to: email,
      subject: subject,
      text: message,
    });

    const alldt = {
      businessName: businessName,
      userName: userName,
      address: address,
      contact: contact,
      email: email,
      password: password,
      businessType: businessType,
      otp: otp,
    };

    const cdata = node_cache.set(email, alldt);

    if (cdata) {
      return res.send({ success: true, message: "OTP sent Successfully...!" });
    }
    if (!cdata) {
      return res.send({ success: false, message: "otp not send" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "internal server  issue",
      error,
    });
  }
};

export const verificationController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!otp || !email) {
      return res.send({ message: "enter both email and otp field" });
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const exu = await userModel.findOne({ email });

    if (exu) {
      return res
        .status(200)
        .send({ success: true, message: "already verified" });
    }

    const exuser = node_cache.get(email);

    if (exuser) {
      if (exuser.otp === otp) {
        const {
          businessName,
          userName,
          address,
          contact,
          email,
          password,
          businessType,
        } = exuser;

        const hashedPwd = await hashPassword(password);
        const data = await userModel.create({
          businessName,
          userName,
          address,
          contact,
          email,
          password: hashedPwd,
          businessType,
          role: 1,
          status: "Active",
        });
        if (data) {
          res.status(201).send({
            success: true,
            message: "User Registration Completed Successfully!",
            data,
          });
        }
      }
      if (exuser.otp !== otp) {
        return res.send({ success: false, message: "invalid otp " });
      }
    }
    if (!exuser) {
      return res.send({
        success: false,
        message: "You are not a registered user ",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server issue", error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        success: false,
        message: "email and password both fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      const bpassword = await hashPassword(password);
      const matched = await comparePassword(password, user.password);
      const AccessToken = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      if (!matched) {
        return res.send({
          success: false,
          message: "invalide passwod please try...! Again ",
        });
      }

      return res.send({
        success: true,
        message: "Login successfully",
        user,
        AccessToken,
      });
    }

    if (!user) {
      return res.send({ success: false, message: "User Not Registered..!" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message, error });
  }
};
export const userUpdateController = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      businessName,
      userName,
      address,
      contact,
      email,
      password,
      businessType,
    } = req.body;

    if (!_id) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    const updates = {};

    if (businessName) updates.businessName = businessName;
    if (userName) updates.userName = userName;
    if (address) updates.address = address;
    if (contact) updates.contact = contact;
    if (email) updates.email = email;
    if (businessType) updates.businessType = businessType;

    if (password) {
      const hashedPassword = await hashPassword(password);
      updates.password = hashedPassword;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).send({
        success: false,
        message: "No update data provided",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.send({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const forgetController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({ success: false, message: "email is required...!" });
    }
    if (email) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .send({ success: false, message: "invalid email address " });
      }

      // check in ex
      const ex = await userModel.findOne({ email });
      if (!ex) {
        return res.send({
          success: false,
          message: "You Are Not a Registered user...! ",
        });
      }
      if (ex) {
        //send otp
        function generateStrongOTP() {
          const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let otp = "";
          for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            otp += characters[randomIndex];
          }
          return otp;
        }

        let otp = generateStrongOTP();
        const subject = "reset password otp from Accounting Master";
        const message =
          "Your OTP for verification is " +
          otp +
          " Please use this code to complete your Registration. Do not share it. ~dharma ";
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        let info = await transporter.sendMail({
          from: `Accounting Master <manasvistaff.dharma@gmail.com>`,
          to: email,
          subject: subject,
          text: message,
        });

        // node cache

        node_cache.set(email, otp);

        return res
          .status(200)
          .send({ success: true, message: "OTP sent Successfully", info });
      }

      return res.send({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;
    if (!email || !otp || !password || !confirmPassword) {
      return res.send({
        success: false,
        message:
          " 'email' , 'otp' , 'password' and 'confirmPassword'  field are required ",
      });
    }

    if (email) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .send({ success: false, message: "invalid email address " });
      }
      const exUser = await userModel.findOne({ email });
      if (!exUser) {
        return res.send({
          success: false,
          messagge: "You Are Not the Registered User ",
        });
      }

      if (password !== confirmPassword) {
        return res.send({
          success: false,
          message: "password and confirmPassword is not same ",
        });
      }
      if (password.length < 6 || confirmPassword.length < 6) {
        return res.send({
          success: false,
          message: "password and confirmPassword length must be 6 digit",
        });
      }

      const ootp = node_cache.get(email);
      if (ootp) {
        if (ootp === otp) {
          const npassword = await hashPassword(password);

          const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { password: npassword },
            { new: true }
          );
          if (updatedUser) {
            node_cache.del(email);
            return res.send({
              success: true,
              message: " password updated Successfully",
              updatedUser,
            });
          }
          return res.send({ success: true, message: "ok" });
        }
      }
    }
    return res.send({ success: false, message: "Incorrect otp " });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "internal server issue...!" });
  }
};

// here we have to create 4 cr

// add Staff , update staff , get staff, delete staff

export const addStaffController = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!_id) {
      return res.send({
        success: false,
        message: "object id of admin not found",
      });
    }
    if (!isValidObjectId(_id)) {
      return res.send({ success: false, message: "objct id not valid" });
    }

    const {
      name,
      contact,
      address,
      pincode,
      state,
      fatherName,
      email,
      password,
    } = req.body;
    const requiredFields = [
      "name",
      "contact",
      "address",
      "pincode",
      "state",
      "fatherName",
      "email",
      "password",
    ];
    const missingFields = [];
    for (let i of requiredFields) {
      if (!req.body[i]) {
        missingFields.push(i);
      }
    }

    if (missingFields.length > 0) {
      return res.send({
        success: false,
        message: "missing Fields ",
        missingFields,
      });
    }

    const exStaff = await userModel.findOne({ email });
    if (exStaff) {
      return res.send({
        success: false,
        message: "This staff is already registerd try with another email",
      });
    }

    const hashpwd = await hashPassword(password);
    const role = 0;
    const staff = await userModel.create({
      userName: name,
      contact,
      address,
      pincode,
      state,
      fatherName,
      email,
      password: hashpwd,
      role: role,
      admin: _id,
    });

    return res
      .status(201)
      .send({ success: true, message: "Staff Added Successfully", staff });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const updateStaffController = async (req, res) => {
  try {
 
    const { id } = req.params; // Staff ID from URL params

    // Check if staff ID is valid
    if (!isValidObjectId(id)) {
      return res.send({ success: false, message: "Invalid staff ID" });
    }

    // Find the staff by ID
    const staff = await userModel.findOne({ _id: id, });

    if (!staff) {
      return res.send({
        success: false,
        message: "Staff member not found or you are not authorized",
      });
    }

    // Destructure fields from request body
    const {
      userName,
      contact,
      address,
      pincode,
      state,
      fatherName,
      email,
      password,
    } = req.body;


    // Validate required fields (optional)
    const requiredFields = [
      "userName",
      "contact",
      "address",
      "pincode",
      "state",
      "fatherName",
      "email",
    ];
    const missingFields = [];

    for (let field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.send({
        success: false,
        message: "Missing fields",
        missingFields,
      });
    }

    // Check if email is being updated to an existing one
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== id) {
      return res.send({
        success: false,
        message: "This email is already registered with another staff member",
      });
    }

    // If password is provided, hash it
    let hashpwd;
    if (password) {
      hashpwd = await hashPassword(password);
    }

    // Update staff details
    const updatedStaff = await userModel.findByIdAndUpdate(
      id,
      {
        userName: userName,
        contact,
        address,
        pincode,
        state,
        fatherName,
        email,
        ...(password && { password: hashpwd }), // Update password only if provided
      },
      { new: true } // Return updated document
    );

    return res.status(200).send({
      success: true,
      message: "Staff updated successfully",
      updatedStaff,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const viewStaffController = async (req, res) => {
  try {
    const { _id } = req.user;
    const staff = await userModel
      .find({ role: 0, admin: _id })
      .populate("admin");

    return res.send({
      success: true,
      message: "staff found successfully",
      staff,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const deleteStaffController = async (req, res) => {
  try {
    const { _id } = req.params;
    const staff = await userModel.findByIdAndDelete(_id);

    if (!staff) {
      return res
        .status(404)
        .send({ success: false, message: "Staff member not found" });
    }

    return res
      .status(200)
      .send({ success: true, message: "Staff member deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};
