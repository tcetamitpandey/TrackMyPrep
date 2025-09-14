import { useState } from "react";

import "../style_folder/auth_style.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth_context";


import toast,{Toaster} from "react-hot-toast";


export default function User_auth_form(){

    const navigate = useNavigate()
    const {setUser} = useAuth()

    const [login_form, setLoginForm] = useState(false) // if false it means sign in form is active

    const [user_form_data, setUser_form_data] = useState({
        user_email : "",
        user_password : ""
    })

    const handleFormSubmit =async (e)=>{
        e.preventDefault();
        
        const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const valid_email = regex_email.test(user_form_data.user_email)

        if(!valid_email){
            toast.error("Please proivde Valid Email")
            return
        }

        const regex_password = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/

        const valid_password = regex_password.test(user_form_data.user_password)


        if(!valid_password){
            toast.error("Password length must be greater then 8 and it should containe upper case and number as well")
            return
        }

        const end_point =  login_form ? `${import.meta.env.VITE_REACT_APP_API_URL}/api/user/login` : `${import.meta.env.VITE_REACT_APP_API_URL}/api/user/signin`

        const res = await fetch(end_point, {
            method :"POST",
            headers : {"Content-Type" : "application/JSON"},
            body : JSON.stringify(user_form_data),
            credentials: "include"
        })

        const data = await res.json()

        console.log("login form error \n\n", data)

        // console.log(data)
        
        if(data.success){
            toast.success("successfully logged in", {id : "login-success"})
            
            navigate("/dashboard")
            setUser_form_data({
                user_email : "",
                user_password : ""
            })
            setUser(data.user_id)

        }else{
            toast.error("Failed to login ")
        }

    }


    return (
        <>
        <div className="auth_form_container">

            <div className="auth_form_intro">
                <div>{ login_form ? "Log in" : "Sign in"} your account</div>
                <div>{ login_form ? "Welcome!" : "Welcome back!"} Please enter your deatils</div>

                <div>
                    <Link to={"/login"} >
                        <button  style={ login_form ? {background : "grey",color:"white"} : {} } onClick={()=>{setLoginForm(true)}} className="form_btn">Log in</button>
                    </Link>
                    
                    <Link to={"/signin"} >
                        <button  style={ !login_form ? {background : "grey",color:"white"} : {} }  onClick={()=>{setLoginForm(false)}}  className="form_btn">Sign in</button>
                    </Link>
                </div>
            </div>

            <div className="auth_form_info">

                <form onSubmit={handleFormSubmit} >

                    <label htmlFor="">Email</label>
                    <input type="text" placeholder="Enter Your Email" onChange={(event)=>{setUser_form_data({...user_form_data, user_email : event.target.value}) }} value={user_form_data.user_email} required />

                    <label htmlFor="">Password</label>
                    <input type="password"  placeholder="Password" onChange={(event)=>{setUser_form_data( {...user_form_data, user_password : event.target.value }) }} value={user_form_data.user_password} required />

                    <div className="auth_form_submit">

                        <input  type="submit" value={ login_form ? "Log in" : "Sign in"} />
                
                    </div>
                </form>

            </div>
        </div>
        <Toaster/>
        </>
    )

}