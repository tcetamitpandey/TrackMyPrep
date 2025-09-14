

import {createClient}  from "@supabase/supabase-js"

import dotenv from "dotenv"

dotenv.config()


const supabase_url=process.env.SUPABASE_URL
const supabase_anon_key=process.env.ANON_KEY

if(!supabase_url || !supabase_anon_key ){
    window.alert("Missing Environment Variables")
    throw new Error("Missing Supabase environment variables");
}

const Backend_supabase = createClient(supabase_url,supabase_anon_key )

export default Backend_supabase
