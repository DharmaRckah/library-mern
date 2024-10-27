import demoModel from "../../models/demoModel.js";
import nodemailer from "nodemailer"
export const contactCreateController = async(req,res)=>{
    try {
        const {name,business,contact,email,city,state}=req.body;
        if(!name || !business  || !contact || !email || !city || !state)
        {
            return res.send({success:false,message:"all fields are required...!"})
        }
        const subject = "Successfully Submitted Contact Form";
        const message = `
          Hi ${name},
    
          Thank you for reaching out to us at ${business}. We have received your contact form submission with the following details:
          
          Name: ${name}
          Business: ${business}
          Contact: ${contact}
          Email: ${email}
          City: ${city}
          State: ${state}
          
          We will review your submission and get back to you shortly.
    
          Best regards,
          Inventory Management System Team
        `;
        let transporter = nodemailer.createTransport({
            service:"Gmail",  
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            }
        })
        let recipients = [email, "manasvitech01@gmail.com"];
        let info = await transporter.sendMail({
            from :`Inventory Management System <manasvistaff.dharma@gmail.com>`,
            to: recipients.join(','),
            subject:subject,
            text:message
        })
    

        
  

        const data = await demoModel.create({
            name,business,contact,email,city,state
        })
       return res.status(201).send({success:true,message:"Successfully Submitted Contact Form"})
    } catch (error) {
       console.log(error)
       return res.status(500).send({success:false,message:error.message,error}) 
    }
}


export const contactListController = async(req,res)=>{
    try {
        
        const contactList = await demoModel.find().sort({ createdAt: -1 });

        return res.status(201).send({success:true,message:"All Contact List found successfully...",contactList})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:error.message,error})
    }
}