
import { Link } from "react-router-dom"

export default function DefaultErrorPage(){
    return(
        <>
        <div className="error_component">
            Are You Sure This Page Exist ?....
            <Link to={"/"} > Go to Home </Link>
        </div>
        </>
    )
}