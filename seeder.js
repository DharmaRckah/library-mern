
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userModel from "./models/userModel.js";

import { hashPassword } from "./middleware/authHelper.js"
dotenv.config();


connectDb();


const seedUser = async () => {
  try { 
    const em = process.env.EMAIL_ADMIN;
    const ps = process.env.PASS_ADMIN;

    const exUser = await userModel.findOne({email:""})
    const hashedPwd = await hashPassword(ps)
    const user = new userModel({
      businessName: "Manasvi Tech Business",
      userName: "Arpit Jain",
      address: "123 Demo Street",
      contact: "1234567890",
      email:em,
      password:hashedPwd,
      businessType: "Retail",
      role: 1, 
    });

    await user.save();
    console.log("User created successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedUser();
