import React from "react"
import Login from "./Components/Login/Login"
import Home from "./Components/Home/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
      
  )
}

export default App
