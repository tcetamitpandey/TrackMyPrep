import { useEffect, useRef, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import {set_user_test_report} from "../store/user_test_report"
import { useNavigate } from "react-router-dom"
import {RingLoader} from "react-spinners"

export default function Ai_Mock_test(){

    const [countDownTimer, setCountDownTimer] = useState("30:00")

    const [ai_question_data, set_ai_question_data] = useState([])
    const [loading, Set_loading] = useState(true)

    const [idx, setIdx] = useState(0)

    const end_of_exam_time = useRef(new Date(Date.now() + 30*60*1000));

    const dispatch = useDispatch()
    const navigate =useNavigate()

    // console.log(end_of_exam_time)

    useEffect(()=>{

        const count_down_ref = setInterval(()=>{

        let now = new Date

        let differnce_in_time = end_of_exam_time.current - now 

        if(differnce_in_time <= 0 ){

            clearInterval(count_down_ref)

            console.log("time is Up")
            setCountDownTimer("00:00")
        }else{

            let min = Math.floor(differnce_in_time/1000/60)
            let sec = Math.floor((differnce_in_time/1000)%60)

            setCountDownTimer(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`)

            // setCountDownTimer(`${min}:${sec}`)
        }
        },1000)
        return () => clearInterval(count_down_ref); 
    },[])


    const User_selected_subject = useSelector((state)=> state.selected_subject_for_exam_Data)

    useEffect(()=>{

        // const storageKey = `questions_${ai_question_data.join("_")}`
        const storageKey = `_questions_for_test`

        const cached = localStorage.getItem(storageKey)

        if(cached){
            try {
                set_ai_question_data(JSON.parse(cached))
                Set_loading(false)
                return
                
            } catch (error) {
                console.error("Corrupt localStorage data, clearing:", cached);
                localStorage.removeItem(storageKey);
            }
           
        }

        async function getQues_Data_from_gemini(){

            const url = `${import.meta.env.VITE_REACT_APP_API_URL}/api/interview/question`

            console.log("ai test url", url)

            const res = await fetch(url, {
                method:"post",
                headers : { "content-type" :"application/json"},
                body: JSON.stringify({ "selected_Subjects" : User_selected_subject}),
                credentials:"include",
            })

            const data = await res.json()


            if(!data["success"]){
                toast.error("Failed to get data from AI")
                console.warn("failed to get data")
                return
            }

            localStorage.setItem(storageKey,JSON.stringify(data.question_list))

            set_ai_question_data(data.question_list)
            Set_loading(false)
            // console.log("typeof: ",typeof(ai_question_data))
            // console.log(data.question_list
        }

        getQues_Data_from_gemini()
    },[])




    async function handle_form_submit(e){
        e.preventDefault();
        Set_loading(true)
        console.log(ai_question_data)

        localStorage.removeItem(`_questions_for_test`)

        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/api/interview/submit`
        
        const res = await fetch(url, {
            method:"post",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify({"ai_question_data" : ai_question_data}), // Keep eye on this
            credentials :"include"
        })

        set_ai_question_data([]) 

        const data = await res.json()

        if(data.success){

            toast.success("Answer submitted! 🚀");
            dispatch( set_user_test_report(data.test_report) )
            navigate("/mock/interview/report");
        }

    }


    function nex_question_func(){
        if(idx >= ai_question_data.length-1 ){

            handle_form_submit()

        }else{
            setIdx(prev=>prev+1)
        }
    }


    useEffect(() => {
        const storageKey = `_questions_for_test`;
        const cached = localStorage.getItem(storageKey);
      
        // ✅ redirect only if no subject selected AND no cached questions
        if ((!User_selected_subject || User_selected_subject.length === 0) && !cached) {
          navigate("/mock/interview/landing");
        }
    }, [User_selected_subject, navigate]);


    if (loading) {

        return (
            <div className="ai_mock_test_container_loading">
              <div className="spinner_content">
                <RingLoader color="#444ce7" size={120} /> 
                <p className="spinner_text"> <span className="ai_mock_test_container_loading_star" >&#10024;</span> Let AI do its magic…</p>
              </div>
            </div>
          );
        
    }

    return(
        <div className="ai_mock_test_container">
            <div>

            <div className="countDown_timer_div">
                <span className="count_down_clock">{countDownTimer}</span>
            </div>
            

            <form className="AI_mock_form" onSubmit={handle_form_submit}>

                <label >Question
                    <div className="ai_ques_div">
                        {ai_question_data[idx].question}
                    </div>
                </label>

                <label >
                    <span>Answer</span>
                    <textarea value={ai_question_data[idx].answer} 
                    
                        onChange={ (event)=>{  const newAnswer = event.target.value; 
                            
                        set_ai_question_data((prev)=> 
                            prev.map((q,qIdx)=>
                        qIdx ===idx ? {...q, answer: newAnswer  } : q)
                    );
                    }}  placeholder="Write you answer here"></textarea>
                </label>

                <div className="Ai_Mock_test_btns" >
                    <button type="submit" >Submit</button>
                    <button type="button" onClick={nex_question_func} className="" >Next</button>
                </div>

            </form>


 </div>


            <Toaster />

        </div>
    )

}