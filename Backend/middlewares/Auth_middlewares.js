import jwt from "jsonwebtoken"

import dotenv from "dotenv"
import Backend_supabase from "../supaBaseConnection.js"


dotenv.config()

const my_secret_key =process.env.JWT_SECRET_KEY


export default function is_valid_user(req, res, next){

    const token = req.cookies.auth_token
    
    if(!token){
        return res.status(401).json({"success": false , "message": "Unauthorized"})
    }
     try{

        const decoded = jwt.verify(token , my_secret_key)
        req.user = decoded
        next()
     }
     catch(err){
         console.error("JWT verification failed", err.message)
         return res.status(401).json({"success": false , "message": "Invalid or Expired Token"})

     }
}


export function is_admin(req, res, next){

    const token = req.cookies.auth_token
    
    if(!token){
        return res.status(401).json({"success": false , "message": "Unauthorized"})
    }
     try{

        const decoded = jwt.verify(token , my_secret_key)
        req.user = decoded

        // console.log("insdie isAdmin middleware\n",req.user,"\n" )

        if(req.user.user_role === "Moderator" || req.user.user_role === "Admin"  ){
            next()
        }else{
            throw new Error
        }
        
     }
     catch(err){
         console.error("Unable to verify Admin", err.message)
         return res.status(403).json({"success": false , "message": "Unable to verify Admin"})

     }
}




export function is_paid_user(req, res, next){

    const token = req.cookies.auth_token
    
    if(!token){
        return res.status(401).json({"success": false , "message": "Unauthorized"})
    }
     try{

        const decoded = jwt.verify(token , my_secret_key)
        req.user = decoded

        // console.log("insdie isAdmin middleware\n",req.user,"\n" )

        const {data, error} = Backend_supabase.from("interview_prep_users").select("is_premium_user").eq("user_id",req.user.user_id)



        if( !data || error  ){
            return res.status(403).json({"success": false , "message": "Unable to verify paid user"})
        }else{
            next()
        }
        
     }
     catch(err){
         console.error("Unable to verify Admin", err.message)
         return res.status(403).json({"success": false , "message": "Unable to verify Admin"})

     }
}

