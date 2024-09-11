import React from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'

const Home = () => {
  const fullText = "An application that tracking student movements between schools within a district or region. This includes managing transfer requests, ensuring timely communication between educational institutions, and maintaining accurate records of student transfers.";

  const truncatedText = fullText.split(' ').slice(0, 8).join(' ') + '...';


  return (

    <div className="home-page">
      <Navbar />
      <div className='header-divider'></div>
      <div className='hero'>
        <div className="text-content">
          <h1>STUDENTS MOVEMENT APPLICATION</h1>
          <p className="full-text">{fullText}</p>
          <p className="truncated-text">{truncatedText}</p>
          <Link to='/login' element={<Login />}><a href="#" className="explore-btn">
            Explore
            <span className="search-icon">🔍</span>
          </a></Link>
        </div>
      </div>
    </div>
  )
}

export default Home