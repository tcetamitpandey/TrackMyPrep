

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

//react hot toast for better user experince 
import toast , { Toaster} from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsByTopic } from "../store/questionsSlice";
import { setSelectedTopic } from "../store/topicSlice";

import {useAuth} from "../context/Auth_context"



export default function Mainbar( ){

    const dispatch = useDispatch()

    const { itemsByTopic  , loading, error } = useSelector( // global redux state variable
        (state)=>state.questionsData
    )

    const {selectedTopic} = useSelector((state)=> state.topics )

    const questionsForTopic = itemsByTopic[selectedTopic] || []

    const {user} = useAuth()

    const [userProgress, setUserProgress] = useState({});


    const [question_data , setQuestion_data ] = useState([])
    
    const [idx , set_idx ] = useState(0)
    // const [is_data_loading,setIs_data_loading] = useState(false)

    const [show_answer,setShow_answer] = useState(false)
    const [show_progress,setShow_progress] = useState(false)


    // let difficulty_list = []
    const [difficulty_list , setDifficultyList] = useState([])
    const [ difficulty_filter, Setdifficulty_filter ] = useState(difficulty_list)

    async function fetchUserProgress() {

        if(!user) return
        try {
          const res = await fetch(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/questions/status`,
            { credentials: "include" }
          );
          const { success, data } = await res.json();
      
          if (success) {

            const progressMap = {}; //ere we are creating object with key as question id and values as there current progress status
            data.forEach(item => {
              progressMap[String(item.question_id)] = item.status;
            });
      
            setUserProgress(progressMap);
          }
        } catch (err) {
          console.error("Error fetching progress", err);
        }
    }
      

    useEffect(()=>{
        if(selectedTopic && !itemsByTopic[selectedTopic]){
            dispatch(fetchQuestionsByTopic(selectedTopic))
        }

        if(user){
            fetchUserProgress()
        }else{
            setUserProgress({})
        }


    },[dispatch, selectedTopic , itemsByTopic, user])
 


useEffect( ()=>{
    if(questionsForTopic.length > 0){

        const unique_difficulties = [ ...new Set(questionsForTopic.map( (item)=> item.difficulty_level ) )]

        setDifficultyList(unique_difficulties);
        Setdifficulty_filter(unique_difficulties[0])

        setQuestion_data(questionsForTopic.filter( (item)=> item.difficulty_level === unique_difficulties[0] ))

        set_idx(0)

    }
}, [questionsForTopic] )



async function updateProgress(status_update){
    // backend call to interview_prep_user_question_progress

    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/questions/status`, {
    
    method: "POST",
    headers : {"Content-Type": "application/json"},
    body : JSON.stringify({
        question_id : question_data[idx].question_unique_id,
        status : status_update
    }),
    credentials : "include"
    })

    const {success, message} = await res.json()

    if(success === true){
        // toast("successfully updated question status", {icon: "👍"})
        toast.success("The question progress status has been updated.")
        console.log("successfully updated question status", message)

        // to instantly refect user changes

        const string_ques_id = String(question_data[idx].question_unique_id)

        setUserProgress( prev =>({
            ...prev,[string_ques_id] : status_update
        }));
    }else{
        console.warn("failed to update question status", message)
        // toast("failed to update question status", {icon: "❌"})
        toast.error("We couldn’t update the question status. Please check your login session and try again.")
    }

    setShow_progress( (prev)=> !prev )

}


function arrow_left_arrow_boundry(){
    set_idx( 
        (prev)=>{ return ( prev <= 0 ? question_data.length -1 : prev -1 )})
}


function arrow_right_arrow_boundry(){
    set_idx(
        (prev)=>{
            return (prev >= question_data.length-1 ? 0 : prev +1 )}
    )
}

// to filter question on basic.. advance and interview
function change_question_type(difficulty_type){

    const filetered_question_data = questionsForTopic.filter(item => item.difficulty_level === difficulty_type)

    if(filetered_question_data.length){
        setQuestion_data(
            filetered_question_data
        )

        Setdifficulty_filter(difficulty_type)
        set_idx(0);
    }
}

function show_or_hide_answers(){

    setShow_answer(prev => !prev) 

}


if (loading) {
    return <div className="mainbar_container">Loading...</div>;
}

if(error){
    return <div className="mainbar_container">Error : {error}</div>;
}

if(question_data.length === 0){
    return <div className="mainbar_container">No Questions Available</div>;
}
console.log("questionsForTopic:", questionsForTopic);
console.log("loading:", loading, "error:", error);

    return (
        <>
            
            <div className="mainbar_container">

            <div className="mainbar_div">
                    {/* <div className="difficulty_btn">
                        <button className="btn" onClick={()=>{change_question_type("Basic"); Setdifficulty_filter(difficulty_list[0]) }} style={ difficulty_filter === "Basic" ? {backgroundColor: "white",color:"black"} : {backgroundColor: "grey",color:"black"}} >Basic</button>
                        <button className="btn" onClick={()=>{change_question_type("Advance"); Setdifficulty_filter(difficulty_list[1])}} style={ difficulty_filter === "Advance" ? {backgroundColor: "white",color:"black"} : {backgroundColor: "grey",color:"black"}}>Advance</button>
                        <button className="btn" onClick={()=>{change_question_type("Interview"); Setdifficulty_filter(difficulty_list[2])}} style={ difficulty_filter === "Interview" ? {backgroundColor: "white",color:"black"} : {backgroundColor: "grey",color:"black"}}>Interview</button>
                    </div> */}
                    <div className="difficulty_btn">
                            {difficulty_list.map((difficulty_item)=>{
                                return(
                                    <button 
                                        key={difficulty_item} 
                                        className={`btn ${difficulty_filter === difficulty_item ?"active" : ""}`} onClick={()=>{change_question_type(difficulty_item)}} style={
                                        difficulty_filter === difficulty_item
                                        ? { backgroundColor: "white", color: "black" }
                                        : { backgroundColor: "grey", color: "black" }
                                    } >
                                        {difficulty_item}
                                    </button>
                                )
                            })}                
                    </div>
                    

                <div className="questions_container">
                            
                            <div className="progress_tracker_container">
                                <div className="progress_tracker_title" onClick={()=>{setShow_progress((prev)=> !prev  )}} >Track Progress</div>
                                <div className="progress_tracker_btn_options_collections">
                                    {show_progress ? (<div>
                                        {/* searching THIS particular question is there in userProgress :  object question_id as key with progress status as value */}
                                        <button className={`progress_tracker_btn ${userProgress[String(question_data[idx].question_unique_id)] === "answered_incorrectly" ? "active" : ""}`  } onClick={() => updateProgress("in_process")}>In Process</button>
                                        <button className={`progress_tracker_btn ${userProgress[String(question_data[idx].question_unique_id)] === "answered_correctly" ? "active" : ""}`  } onClick={() => updateProgress("answered_correctly")}>Correct</button>
                                        <button className={`progress_tracker_btn ${userProgress[String(question_data[idx].question_unique_id)] === "answered_incorrectly" ? "active" : ""}`  } onClick={() => updateProgress("answered_incorrectly")}>Incorrect</button>
                                        <button className={`progress_tracker_btn ${userProgress[String(question_data[idx].question_unique_id)] === "review_later" ? "active" : ""}`  } onClick={() => updateProgress("review_later")}>Review Later</button>
                                        <button className={`progress_tracker_btn ${userProgress[String(question_data[idx].question_unique_id)] === "skipped" ? "active" : ""}`  } onClick={() => updateProgress("skipped")}>Skip</button>
                                    </div>) : (<></>) }
                                </div>
                            </div>

                        <div className="mainbar_questions_and_counter">
                                            <div>{idx + 1}/{question_data.length }</div>
                                            <div>
                                                {question_data[idx].questions}
                                            </div>
                
                        </div>

                        <div className="mainbar_arrow">
                            <FaAngleLeft onClick={arrow_left_arrow_boundry} className="mainbar_arrow_btn" />
                            <FaAngleRight onClick={arrow_right_arrow_boundry} className="mainbar_arrow_btn"  />
                        </div>

                        { show_answer &&(
                            <div className="show_answer_container open" >
                            {question_data[idx].answers}
                        </div>)}
                        
                        <div className="mainbar_submit_btns_container">

                            <Link to={"/mock/interview/landing"} className="btn"  style={{ backgroundColor: "white", color: "black", textDecoration: "none" }}>
                                <button className="btn" >Check your knowledge</button>
                            </Link>
                            
                            <button className="btn" onClick={show_or_hide_answers} style={{backgroundColor: "white",color:"black"}}>
                                {show_answer ? "Hide Answer" : "View Answer" }</button>
                        </div>
                </div>

            </div>


            </div>
        
            <Toaster position="top-center" />
        </>
       
    )
}