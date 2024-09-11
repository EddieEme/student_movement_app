import React from "react"
import Login from "./Components/Login/Login"
import Home from "./Components/Home/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import Navbar from "./Components/Navbar/Navbar"
import Dashboard from "./Components/Dashboard/Dashboard"
import AddStudent from "./Components/AddStudent/AddStudent"
import Transfer from "./Components/Transfer/Transfer"
import Footer from "./Components/Footer/Footer"
import About from "./Components/About/About"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/transfer_student" element={<Transfer />} />
      </Routes>
      <Footer/>
    </Router>
      
  )
}

export default App
