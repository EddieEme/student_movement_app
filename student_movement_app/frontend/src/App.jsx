import React from "react"
import Login from "./Components/Login/Login"
import Home from "./Components/Home/Home"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./Components/Dashboard/Dashboard"
import AddStudent from "./Components/AddStudent/AddStudent"
import Transfer from "./Components/Transfer/Transfer"
import Footer from "./Components/Footer/Footer"
import About from "./Components/About/About"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="transfer_student" element={<Transfer />} />
        </Route>
        {/* Add a catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer/>
    </Router>
      
  )
}

export default App
