import Backend_supabase from "../supaBaseConnection.js";




export async function get_all_the_question_data(req,res){
    // get what question user is asking in query param or better dynami url as /:topic

    try{

    let topic_name = req.params.topic_name  || "java" // url : /api/questions/topic_name/:topic_name
    console.log("fetching specific subject data ", topic_name)

    topic_name = topic_name.toLowerCase()

    const {data , error, status} = await Backend_supabase.from("interview_prep_questions").select().eq("topic_name",topic_name)

    if(error){
        const question_status = status || 400
        return res.status(question_status).json({success: false, "message": "Failed to Retrive Questions", error})
    }

    const questions_data = data

    // console.log("questions_data", questions_data)

    return res.status(status).json({success: true, "message": `successfully Retrived ${topic_name} Questions data`, "data" : questions_data })
    
    }catch(err){
        return res.status(500).json({success: false, "message": "Something went wrong", err })
    }
}



export async function get_all_the_topic_data(req,res){

    try{

        const {data, error, status} = await Backend_supabase.from("interview_perp_topics").select().eq("is_active",true)

        if(error){
            return res.status(status).json({"success": false, "message" : "failed to get all topics name", error})
        }

        const all_topic_name = data

        return res.status(status).json({"success":true, "message" :"successfully fetched all topics name", "data" : all_topic_name})
        

    }catch(err){

        return res.status(500).json({"success":false,"message" :"Something went wrong",err})

    }
    
}


export async function get_questions_status(req, res){

    let user_id = req.user.user_id

    if(!user_id){
        return res.status(400).json({"success":false, "message": "please provide all the neccessary information"})
    }

    const { data, error } = await Backend_supabase.from("interview_prep_user_question_progress").select().eq("user_id",user_id)

    if(error){
        return res.status(400).json({"success":false, "message" : "failed to get question status"})
    }

    // console.log("getting question progress status :", data, "\n", "for user_id", user_id)

    return res.status(200).json({"success":true, "message" : "successfully Retrived question status", "data" : data})

}


export async function update_question_status( req, res){
        
    let user_id =req.user.user_id // its coming from JWT only after verifing user 

    let question_id = req.body.question_id  
    let status = req.body.status

    if(!user_id || !question_id || !status){
        return res.status(400).json({"success":false, "message": "please provide all the neccessary information"})
    }

    const { data, error } = await Backend_supabase.from("interview_prep_user_question_progress").upsert({
        "user_id" : user_id, "question_id" : question_id,  "status" : status
    }, { onConflict : ["user_id", "question_id"]}
).select()

    if(error){
        return res.status(400).json({"success":false, "message" : "failed to update question status"})
    }

    return res.status(200).json({"success":true, "message" : "successfully updated question status"})
}


export async function upvote_particular_topic_by_user(req, res){

    const user_id = req.user.user_id
    const topic_id = req.body.topic_id


    if(!user_id || !topic_id){
        return res.status(500).json({"success" : false , "message" : "provide all the neccessary data" })
    }


    const { data , error } = await Backend_supabase.from("interview_perp_topic_votes").upsert({
        "user_id" : user_id,
        "topic_id" : topic_id
    }, {onConflict : ["user_id", "topic_id"]})


    if( !data && error){
        return res.status(400).json({"success" : false , "message" : "Already Upvote" })
    }


    return res.status(200).json({"success": true , "message" : "successfully Upvoted question"  })
    
}




export async function get_leaderboard_topics_vote(req,res){

    const { data, error } = await Backend_supabase
    .from("topic_leaderboard")
    .select("*");

    if(error){
        return res.status(400).json({"success": false, "message" : "Failed to fetch Upvote data from DB" })
    }

    return res.status(200).json({ "success": true, "message" : "successfully fetched Upvote data", "data" : data })

}


export async function upload_question_data(req, res){

    try {


    const user_id = req.user?.user_id
    const topic_name = req.body?.topic_name
    const difficulty_level = req.body?.difficulty_level
    const questions = req.body?.question_data
    const answers = req.body?.answer_data

    if(!user_id || !topic_name || !difficulty_level || !questions || !answers ){
        return res.status(400).json({success : false, "message" : "please provide all the neccessary information" })
    }



    let {data : user, error : userError} = await Backend_supabase.from("interview_prep_users").select("user_role").eq("user_id",user_id).single()

    if(!user || userError){
        return res.status(403).json({
            success: false,
            message: "User not found. Please contact Admin."
        })
    }

    if(user.user_role != "Moderator" &&  user.user_role != "Admin"){
        return res.status(403).json({success : false, "message" : "You are not authorized to add questions!" })
    }

    const {data, error} = await Backend_supabase.from("interview_prep_questions").insert({"created_by_user_id" : user_id, topic_name, difficulty_level,  questions, answers  })

    if(error){
        return res.status(400).json({success : false, "message" : "Failed to add questions", "error" : error.message })
    }

    return res.status(200).json({success : true, "message" : "Question added successfully" })

        
    } catch (error) {
        return res.status(500).json({success : false, "message" : "Internal Server Error" })
    }

}



