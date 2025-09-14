import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { useState } from 'react'
import App from './App'

import LandingPage from './components/LandingPage'
import User_auth_form from './components/User_auth_form'
import DefaultErrorPage from "./components/Error404"
import SideBar from "./components/SideBar"
import Mainbar from "./components/Main_Bar"
import Ai_interviewer from './components/Ai_interviewer_landing'
import Ai_Mock_test from './components/Ai_Mock_test'

import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import AboutUs from './components/AboutUs'
import LeaderBoard from './components/LeaderBoardPage'
import SubscriptionPage from './components/subscription_page'
import Admin_Edit_Page from './components/Edit_admin_page'
import ReportPage from './components/ReportPage'


import { AuthProvider } from './context/Auth_context'

// Redux from state management
import {Provider} from "react-redux"
import store from './store/store'

function Dashboard(){

  return (
    <>
      <div className='app_main_section'>
        <SideBar />
        <Mainbar />
      </div>
    </>
  )
  
}


const router = createBrowserRouter([
  {path:"/", element : <App />, children : [
    { index: true, element: <LandingPage/>},
    {path:"/login", element : <User_auth_form /> },
    {path:"/signin", element : <User_auth_form /> },
    {path:"/dashboard", element :  <Dashboard/> },
    {path:"/leaderboard", element :  <LeaderBoard/> },
    {path:"/about", element :  <AboutUs/> },
    {path:"/subscription", element :  <SubscriptionPage/> },
    {path:"/admin/edit", element :  <Admin_Edit_Page/> },
    {path:"/mock/interview/landing", element :  <Ai_interviewer/> },
    {path:"/mock/interview/test", element :  <Ai_Mock_test/> },
    {path:"/mock/interview/report", element :  <ReportPage/> },
    {path:"*", element :  <DefaultErrorPage/> }
  ]}

])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Provider store={ store }>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </Provider>
  </AuthProvider> 
  
)
