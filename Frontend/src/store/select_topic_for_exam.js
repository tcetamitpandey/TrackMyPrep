

import { createSlice } from "@reduxjs/toolkit";



const selected_subject_for_exam = createSlice({
    name : "subject_selected",
    initialState : [],
    reducers : {
        set_Selected_subject : ( state, action  )=> {
            return action.payload
        }
    }
})


export const {set_Selected_subject} = selected_subject_for_exam.actions
export default selected_subject_for_exam.reducer;