import { useState } from "react"
import toast, {Toaster} from "react-hot-toast"


export default function Admin_Edit_Page(){

    const [form_data, setFormData]= useState({
        topic_name : "", 
        difficulty_level : "",
        question_data : "", 
        answer_data : ""
    })

    function handleChange(event){

        setFormData( (prev) =>({
                ...prev,
                [event.target.name] : event.target.value
        }));
    }

    async function add_new_data(event){

        event.preventDefault()

        const edit_admin_url = `${import.meta.env.VITE_REACT_APP_API_URL}/api/questions/upload/`

        console.log("edit_admin_url", edit_admin_url)
        console.log("react form data\n", form_data)

        const res = await fetch( edit_admin_url ,{
            method : "post",
            headers : {"content-type" : "application/json"},

            body : JSON.stringify({
                ...form_data
            }),
            credentials : "include"
        })

        const res_data = await res.json()

        console.log("inside edit_admin react page\n", res_data)

        if(res_data.success === false){
            const error_msg =  +res_data?.message || ""
            toast.error(`failed to upload question ${error_msg}`)
            return console.warn("failed to upload question\n","reason: ",res_data.error_msg )
        }

        toast.dismiss()
        toast.success("successfully uploaded question")
        
        setFormData({
            topic_name : "", 
            difficulty_level : "",
            question_data : "", 
            answer_data : ""
        })

    }

    return(
        <>
            <div className="edit_page_container">

                <h1>Upload New Questions</h1>

                <form onSubmit={add_new_data} className="form" >
                    <label >
                        Topic
                        <select value={form_data.topic_name} onChange={handleChange} name="topic_name" required >
                            <option value="">Select Topics</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="dsa">DSA</option>
                            <option value="javascript">Javascript</option>
                            <option value="reactjs">ReactJS</option>
                        </select>
                    </label>
                    
                    <label >
                        Difficulty
                        <select value={form_data.difficulty_level} onChange={handleChange} name="difficulty_level" required >
                            <option value="">Select Difficulty</option>
                            <option value="Basic">Basic</option>
                            <option value="Advance">Advance</option>
                            <option value="Interview">Interview</option>
                        </select>
                    </label>

                    <label>
                        Question
                        <textarea name="question_data" value={form_data.question_data} onChange={handleChange} required />
                    </label>

                    <label>
                        Answer
                        <textarea name="answer_data" value={form_data.answer_data} onChange={handleChange} required />
                    </label>

                    <div className="admin_form_button_section">

                        <button type="submit" className="admin_form_btn">Submit</button>
                        <button type="reset" className="admin_form_btn">Reset</button>
                    </div>


                </form>
                
            </div>
            <Toaster/>
        </>
    )
}