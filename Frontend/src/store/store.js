
import {configureStore} from "@reduxjs/toolkit"

import questionsReducer from "./questionsSlice"

import topicsSlice from "./topicSlice"

import selected_subject_for_exam from "./select_topic_for_exam"

import user_test_report from "./user_test_report"


const store = configureStore({
    reducer : {
        questionsData : questionsReducer,
        topics : topicsSlice,
        selected_subject_for_exam_Data : selected_subject_for_exam,
        userReport : user_test_report
    },
})


export default store