import { useState , useEffect} from "react";
import toast, {Toaster} from "react-hot-toast"

export default function LeaderBoard() {
  const [skills, setSkills] = useState([])
  const [reFetchUpvote, setReFetchUpvote] = useState(false)

  async function upvote_topic_fun(topic_id){

    const response = await fetch (`${import.meta.env.VITE_REACT_APP_API_URL}/api/questions/topic/upvote`, {
        method :"post",
        headers : {"content-type": "application/json"},
        body :JSON.stringify({
            "topic_id" : topic_id 
        }),
        credentials :"include"
    })

    const {success, message }= await response.json()

    if(success === false){
        
      toast.error("Unable to Upvote!\nTip : Login to Vote")
      console.error("failed to upvote topic", message)
      return

    }

    toast.success("Upvoted successfully")
    setReFetchUpvote(prev=> !prev)
  }


  useEffect(()=>{

    async function fetch_topic_upvote_data(){

        const fetch_topic_vote_url = `${import.meta.env.VITE_REACT_APP_API_URL}/api/questions/topic/dashboard/vote`

        const res = await fetch(fetch_topic_vote_url,{
            method :"get"
        })

        const res_data = await res.json()

        // console.log("fetch_topic_vote_url", fetch_topic_vote_url)
        // console.log(res_data)

        if(res_data.success === false){
            toast.error("Failed to get upvote data")
            return 
        }
        

        setSkills(res_data.data)

    }

    fetch_topic_upvote_data()

  },[reFetchUpvote])


  
  return (
    <>
    <div className="leaderboard_container">
      <h2>
        <strong>Top Skills</strong> that helped people land jobs 🚀
      </h2>
      <p className="subtitle">Support others by upvoting the skills that shaped your career journey.</p>

      <ul className="leaderboard_list">
        {skills &&  skills.map((skill, index) => (
          <li key={skill.topic_id} className="leaderboard_item">
            <span className="rank">#{index + 1}</span>
            <span className="skill_name">{skill.topic_name}</span>
            <span className="votes">{skill.votes} votes</span>
            <button
              className="upvote_btn"
              onClick={() => upvote_topic_fun(skill.topic_id)}
            >
              ⬆ Upvote
            </button>
          </li>
        ))}
      </ul>
    </div>
    <Toaster/>
    </>
  );
}
