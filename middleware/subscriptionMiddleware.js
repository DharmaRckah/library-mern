import cron from "node-cron";
import User from "../models/userModel.js"; 
import { addDays, differenceInDays } from "date-fns"; 
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 


let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const subscription = async () => {
  try {
    const users = await User.find({ role: 1, status: "Active" }).populate("paymentValidation");

    const today = new Date();

    users.forEach(async (user) => {
      const warningDate3Days = addDays(user.endDate, -3);
      const warningDate2Days = addDays(user.endDate, -2);
      const warningDate1Day = addDays(user.endDate, -1);

     
      if (user.isFreeTrial && differenceInDays(today, user.createdAt) >= 3) {
        user.isFreeTrial = false;
        user.status = "Inactive";
        await user.save();
        console.log(`Free trial expired for user: ${user.email}`);
        
     
        let smd = `Dear ${user.userName}, your free trial has expired. Please choose a subscription plan to continue using our services.`;
        await sendWarningEmail(user.email, smd);
      }

      // Check for subscription expiry
      if (user.endDate <= today) {
        console.log(user);
        user.status = "Inactive";
        await user.save();
        
        // Send email when status changes to "Inactive"
        let smd = `Dear ${user.userName}, your subscription has expired on ${user.endDate.toDateString()}. Please renew to continue enjoying our services.`;
        await sendWarningEmail(user.email, smd);

      } else if (warningDate3Days <= today && user.status === "Active") {
        let smd = `Dear ${user.userName}, your subscription will expire in 3 days on ${user.endDate.toDateString()}. Please renew to continue enjoying our services.`;
        await sendWarningEmail(user.email, smd);
      } else if (warningDate2Days <= today && user.status === "Active") {
        let smd = `Dear ${user.userName}, your subscription will expire in 2 days on ${user.endDate.toDateString()}. Please renew to continue enjoying our services.`;
        await sendWarningEmail(user.email, smd);
      } else if (warningDate1Day <= today && user.status === "Active") {
        let smd = `Dear ${user.userName}, your subscription will expire in 1 day on ${user.endDate.toDateString()}. Please renew to continue enjoying our services.`;
        await sendWarningEmail(user.email, smd);
      }
    });
  } catch (error) {
    console.error("Error checking subscriptions: ", error);
  }
};

const sendWarningEmail = async (email, message) => {
  try {
    let info = await transporter.sendMail({
      from: `Manasvi-Invenotry<${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Inventory Subscription Expiry Warning",
      text: message,
    });
    console.log("Warning email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};


cron.schedule("* * * * *", subscription); 

export default subscription;
