import nodemailer from "nodemailer"
import Backend_supabase from "../supaBaseConnection.js";



const sanatizeHeader = str => String(str || "").replace(/(\r|\n)/g, " ").trim()

async function contact_us_function( req, res){

    try {

        // const {name , email, message} = req.body

        const name = sanatizeHeader(req.body.name)
        const email = sanatizeHeader(req.body.email)
        const message = sanatizeHeader(req.body.message) || ""

        if(!name || !email || !message){
            return res.status(400).json({"success": false, "message" : "Name , Email and Message body is required" })
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({success:false, message : "Invalid Email"})
        }

        const file = req.file   // it comes fro multer // file.buffer will be available for us

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);
        console.log("File:", file);

        // creating transporter object that know how to talk to gmail smtp
        const transporter = nodemailer.createTransport({
            host : "smtp.gmail.com",
            port: 465,
            secure : true,
            auth :{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        })

        // describe the email to be sent
        const mailOptions ={
            from : `"${name}" <${email}>`,
            to : "ap7666088748@gmail.com",
            subject : "New Contact form submit TestMyPrep",
            html : `
            <h2>New Contact Form Submission TrackMyPrep</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message}</p>
        `,
            attachments : file ? [{
                filename: file.originalname,
                content : file.buffer,
                contentType : file.mimetype
            }] :[]
        }

        // actually senfing the email
        const info  =await transporter.sendMail(mailOptions)

        console.log("Email sent :", info.messageId)

        return res.status(200).json({success : true, "message" :"Form data received and email sent successfully" })
        
    } catch (error) {

        console.error("Error While Sending Email: ", error)

        return res.status(500).json({"success": false, "message" : "failed to send Email", "error" :  error.message })
        
    }
}


export {contact_us_function}