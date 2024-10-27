import nodemailer from 'nodemailer';
import submitFormModel from '../models/submitFormModel.js'; // Ensure this is your correct model path

export const formSubmitController = async (req, res) => {
  try {
    const { name,mobile, email,address, message } = req.body;
    // Ensure all required fields are provided
    console.log(name,mobile, email,address, message,"body data")
    if (!name || !mobile || !email || !address || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Set up nodemailer transporter
    let transporter = nodemailer.createTransport({
        service:"Gmail",  
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        }
    })
    // Email options
    console.log(name,mobile, email,address, message,"dheeru")
    const mailOptions = {
      from: email, // Sender's email address
      to: 'prajapatidheerendra45@gmail.com', // Receiver's email address (from request body)
      subject: 'Form Submission Received',
      text:` Hi ${name},\n\nThank you for your message:\n\n"${message}"\n\nWe will get back to you shortly! \n Address :${address}  \n  Mobile:${mobile}`, // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Optionally save to MongoDB
    await submitFormModel.create({ name, email, mobile, address, message }); // Save the submission to DB

    // Return success response
    return res.status(200).send({
      success: true,
      message: 'Form submitted successfully, email sent!',
      info,
    });

  } catch (error) {
    console.error("Error in formSubmitController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};