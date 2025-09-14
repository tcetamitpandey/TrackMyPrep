import { Link } from "react-router-dom"

import { useAuth } from "../context/Auth_context"


export default function LandingPage(){

    const {user, setUser} = useAuth()

    async function handle_logout_fun(){

        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/logout`, {
            method : "POST",
            credentials : "include"
        })

        const data = await response.json()

        if(data.success){
            setUser(null)
            toast.success("successfully Log Out")
        }

    }

    return (
        <>
            <div className="landing_page_container">
                <div className="Landing_page_pattern" ></div>
                <div className="landing_page_body">
                    <h1>Land your dream job with confidence.</h1>
                    <h2>Practice with AI-powered mock interviews, master real-world questions, and track the skills top employers hire for.</h2>
                </div>

                <div className="landing_page_btn">
                    <Link to={"/dashboard"} ><button className="btn bashboard_btn">Take me to Dashboard</button></Link>
                    {user ? <button className="btn landing_page_btn_login" onClick={handle_logout_fun} >Logout</button> :
                            <Link to={"/login"} > <button className="btn landing_page_btn_login" >Login</button></Link>
                    }
                    
                </div>
            </div>
        </>
        
    )

}
