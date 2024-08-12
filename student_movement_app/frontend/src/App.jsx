import React from "react"
import Login from "./Components/Login/Login"
import Home from "./Components/Home/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import Navbar from "./Components/Navbar/Navbar"
import Dashboard from "./Components/Dashboard/Dashboard"
import AddStudent from "./Components/AddStudent/AddStudent"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent/>} />
      </Routes>
    </Router>
      
  )
}

export default App
