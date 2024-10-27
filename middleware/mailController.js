import nodemailer from "nodemailer"

export const mailController= async(req,res)=>{
    try {
       
        const subject = "OTP verification from accounting"
        const {email}=req.body;
        if(!email){
            res.send({message:"please enter email"})
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: "Invalid email format",
          });
        }

        function generateStrongOTP() {
            const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let otp = '';
            for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                otp += characters[randomIndex];
            }
            return otp;
        }
        

        let otp = generateStrongOTP();
        const message = "Your OTP for verification is " + otp +" Please use this code to complete your Registration. Do not share it. ~dharma ";
        let transporter = nodemailer.createTransport({
            service:"Gmail",  
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from :`Accounting Master <manasvistaff.dharma@gmail.com>`,
            to:email,
            subject:subject,
            text:message
        })

        res.status(200).send({success:true,message:"OTP sent Successfully"})

    } catch (error) {
     res.status(500).send({success:false,message:"failed to sent otp, enter a valid email id ",error})   
    }
}