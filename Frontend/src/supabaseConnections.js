
import { createClient } from '@supabase/supabase-js'

const supabase_url=import.meta.env.VITE_SUPABASE_URL
const supabase_anon_key=import.meta.env.VITE_ANON_KEY

if(!supabase_url || !supabase_anon_key ){
    window.alert("Missing Environment Variables")
    throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabase_url,supabase_anon_key )

export default supabase

