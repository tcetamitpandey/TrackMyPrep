
import './App.css'

import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'

import ContactUS from './components/ContactUS'



function App() {
  

  return (
    <>
    <div className='App_container'>
      <Navbar/>
      {/* All child routes LandingPage will render here */}
      <Outlet/>
      <div className="App_container_contact_us_Btn">
      <ContactUS />
      </div>
      
    </div>
      
    </>
  )
}

export default App
