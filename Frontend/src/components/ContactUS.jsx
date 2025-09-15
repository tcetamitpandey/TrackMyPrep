import { useState, useRef, useEffect } from "react";

import "../style_folder/contact_us.css"
import { Toaster,toast } from "react-hot-toast";

export default function ContactUS() {

    const [isOpen, setIsOpen] = useState(false)

    const [formData, setFormData] = useState({
        name : "",
        email : "",
        message : ""
    })

    const [fileData, setFileData] = useState(null)

    const formRef= useRef(null)

    function toggleForm(){
        setIsOpen(prev=>!prev)
    }


    useEffect(()=>{
        function handle_click_outside_func(event){

            if(formRef.current && !formRef.current.contains(event.target)){
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown",handle_click_outside_func)

        return ()=>{
            document.removeEventListener("mousedown",handle_click_outside_func)
        }

    },[]);

    function formHandleFunction(e){

        e.preventDefault()
        setIsOpen(false)

        console.log("name : ", formData.name)
        console.log("email : ", formData.email)
        console.log("message : ", formData.message)

        const data_to_send = new FormData()
        data_to_send.append("name", formData.name)
        data_to_send.append("email", formData.email)
        data_to_send.append("message", formData.message)

        if(fileData){
            data_to_send.append("attachment", fileData)
        }

        async function send_form_DataToBackend(){

            const url = `${import.meta.env.VITE_REACT_APP_API_URL}/api/contactus`

            const response = await fetch(url, {method: "POST", body: data_to_send})

            const data = await response.json()

            if(!data.success){
                toast.error(data.message)
                return 
            }

            toast.success("Successfully Sent Email")

        }

        send_form_DataToBackend()

        setFormData(
            {
                name : "",
                email : "",
                message : ""
            }
        )

        setFileData(null)

    }




    function handleFileChnage(e){
        setFileData(e.target.files[0])
    }

    return (
    <div className="contact_us_container">
        { isOpen ?
        <div className="contact_us_form">
            <div className="contact_us_form_headline">
            <h2>Contact Us</h2>
            <div onClick={ ()=> setIsOpen(false)} >&#x274C;</div>
            </div>
            

            <form ref={formRef} onSubmit={formHandleFunction} className="contact_us_form_container" >
                <label >
                    <span className="label-text" >Name</span>
                    <input name="name" type="text" value={formData.name} onChange={ (e)=> setFormData((item)=>({ ...item,[e.target.name] : e.target.value }) )} placeholder="Name" />
                </label>
                <label >
                    <span className="label-text" >Email</span>
                    <input name="email" type="text" value={formData.email} onChange={ (e)=> setFormData((item)=>({ ...item,[e.target.name] : e.target.value }) )} placeholder="Email" />
                </label>
                <label >
                    <span className="label-text" >Message</span>
                    <textarea name="message" value={formData.message} onChange={ (e)=> setFormData((item)=>({ ...item,[e.target.name] : e.target.value }) )} placeholder="Message"></textarea>
                </label>
                <label>
                    <span className="label-text" >Attachments (Max 5MB)</span>
                    <input type="file" onChange={handleFileChnage} />
                </label>
                <button>Send</button>
            </form>
        </div> :
            <img src={"/ContactUs_Png_logo.png"} alt="contact us" onClick={toggleForm} />
    }
     <Toaster/>
    </div>
   
    )
}