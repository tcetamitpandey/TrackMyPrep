

import Backend_supabase from "../supaBaseConnection.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const my_secret_key =process.env.JWT_SECRET_KEY

function check_auth(req, res){

    const token = req.cookies.auth_token

    if(!token || token.length==0){
        return res.status(401).json({"success": false, "message" : "user not logged in"})
    }

    try {

        const decoded = jwt.verify( token, my_secret_key )
        return res.status(200).json({"success": true, "user" : decoded })
    } catch (error) {
        return res.status(401).json({"success":false, "message": "Invalid token"})
    }

}


async function verify_user(req,res){

    const {user_email, user_password } = req.body

    // check 1 ) if user exist or not then validte its password 

    const {data , error, status} = await Backend_supabase.from("interview_prep_users").select().eq("email", user_email)

    if(error){
        return res.status(status).json({"success": false, "message": "failed to Retrive user data", error})
    }

    if (!data || data.length === 0) {
        return res.status(401).json({ success: false, message: "User not found" });
    }

    const is_password_correct = await bcrypt.compare(user_password, data[0].password )

    const user = data[0]

    const jwt_data = {
        email : user.email,
        user_role : user.user_role,
        user_id : user.user_id
    }

    if(is_password_correct){
        
        const token = jwt.sign(jwt_data,process.env.JWT_SECRET_KEY, {expiresIn : "1h"})

        res.cookie("auth_token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 60*60*1000
        } )

        console.log('user Login successfully')
        return res.status(200).json({ "success" : true, "user_id" : user.email, "message":"user Login successfully"})
    }

    console.log('user Login Failed')

    return res.status(401).json({"success" : false, "message": "Invalid credentials"})

}


async function create_user(req,res){

    const user_role ="Member"

    try{

    const {user_email,user_password} = req.body

    if(!user_email || !user_password ){
        return res.status(401).json({"success": false, "message": "provid all the neccessary details" })
    }

    const { data : check_user_email }= await Backend_supabase.from("interview_prep_users").select().eq("email",user_email)

    if(!check_user_email || check_user_email.length > 0){
        return res.status(409).json({"success" : false, "message" : "Email already registered" })
    }
    
    // hasing password
    const salt = bcrypt.genSaltSync(10)
    const hashed_password = bcrypt.hashSync(user_password,salt)


    const {data, error , status} = await Backend_supabase.from("interview_prep_users").insert({email :user_email, password : hashed_password, user_role : user_role  }).select(`user_id,email,user_role`)

    if(error){
        console.error(error)

        return res.status(400).json({"success": true, "message":"user creation failed", error})
    }

    const user = data[0]

    const jwt_data = {
        email : user.email,
        user_role : user.user_role,
        user_id : user.user_id
    }

    const token = jwt.sign(jwt_data ,process.env.JWT_SECRET_KEY, { expiresIn :"1h" })

    res.cookie("auth_token",token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict", // Csrf protection we will see this later 
        maxAge : 60*60 *1000 // 1hour

    })

    console.log('user creation successfully')

    return res.status(201).json({"success": true, "user_id" : user.email, "user_role" : user.user_role , "message":"user created successfully"})
        
    }
    catch(err){
        console.error(err)

        return res.status(500).json({"success": false, "message":"Server Error"})
    }
        
    
}


function log_user_out(req, res){

    res.clearCookie("auth_token", {
        httpOnly: true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict"
    })

    return res.json({"success" : true , "message" : "Logged out successfully"})
    
}


export { verify_user, create_user, check_auth, log_user_out }
