

import { createSlice } from "@reduxjs/toolkit";



const user_test_report = createSlice({
    name : "user_test_report_name",
    initialState : [],
    reducers : {
        set_user_test_report : ( state, action) =>{
            return action.payload
        }
    }
})


export const {set_user_test_report} = user_test_report.actions

export default user_test_report.reducer