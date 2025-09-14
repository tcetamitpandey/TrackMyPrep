import { useState } from "react";

import "../style_folder/contact_us.css"

export default function ContactUS() {

    const [isOpen, setIsOpen] = useState(true)

    function toggleForm(){
        setIsOpen(prev=>!prev)
    }

    return (
    <div className="contact_us_container">
        { isOpen ?
        <div className="contact_us_form">
            <div>
            <h2>Contact Us</h2>
            <div onClick={setIsOpen(false)} >X</div>
            </div>
            

            <form >
                <label >Name
                    <input type="text" placeholder="Name" />
                </label>
                <label >Email
                    <input type="text" placeholder="Email" />
                </label>
                <label >Message
                    <textarea name="message" placeholder="Message"></textarea>
                </label>
                <button>Send</button>
            </form>
        </div> :
            <img src={"./ContactUs_Png_logo.png"} alt="contact us" onClick={toggleForm} />
    }
    </div>
    )
}