import { useEffect,useState } from "react"

import Default_user_img from "../assets/user.png"

import {useAuth} from "../context/Auth_context"

import toast, {Toaster} from "react-hot-toast"
import { Link } from "react-router-dom"


import { useDispatch, useSelector } from "react-redux"
import { fetchTopics, setSelectedTopic } from "../store/topicSlice"

export default function SideBar(){


    const dispatch = useDispatch()

    const {items :topics ,loading, selectedTopic} = useSelector(
        (state)=>state.topics
    )


    const {user} = useAuth()


    useEffect(()=>{
        if(!topics || topics.length === 0){
            dispatch(fetchTopics())
        }
    },[dispatch, topics])

    console.log("sidebar rendering")


    return (
        <>
             <div className="sidebar_container">
                <div>

                <div className="sidebar_profile" >
                    <img className="sidebar_user_icon" src={Default_user_img} alt="" />

                    <div className="sidebar_user_details_profile">
                                {user 
                    ? user.email
                    : "Anonymous"}
                    </div>
                    
                </div>

                <div className="sidebar_topics">

                    {!loading && topics.map( (topic_item)=>{
                        return (
                            < div key={topic_item.id}>
                            
                                <div   
                                    onClick={()=>{ dispatch(setSelectedTopic(topic_item.topic_name))}} className={`topic_div ${selectedTopic === topic_item.topic_name ? "active" : ""}`} key={topic_item.id} >
                                    <img src={topic_item.icon_url} alt="" />
                                    {topic_item.topic_name}
                                </div>
                        
                            </div>
                        )
                            
                    })}
                
                </div>

                </div>

                <div className="sidebar_ai_interview_button">
                    <Link to={"/mock/interview/landing"}>
                    <button >
                        Ai written Mock Interview
                    </button>
                    </Link>
                </div>

            </div>
            <Toaster/>
        </>
       
    )
}