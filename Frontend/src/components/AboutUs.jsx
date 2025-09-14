import { FaLinkedin } from "react-icons/fa"

export default function AboutUs(){
    return (
        <div className="AboutUS_container">
            <h2>About Me</h2>
            <p>Hi, it's me <strong>Amit Pandey</strong>.</p>

            <p>
            Have any suggestions, improvements, or just want to say hi?  <span className="Hand_wave">👋</span>
            </p>
            <p className="about_us_bottom_container">
                Contact me on{" "}
                <a
                href="https://www.linkedin.com/in/amit-pandey-tcet"
                target="_blank"
                rel="noopener noreferrer"
                >
                <FaLinkedin className="icon_style" />
                </a>
            </p>
            
        </div>
    )
}