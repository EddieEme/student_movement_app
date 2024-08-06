import React from 'react'
import './Home.css'
import big_phone from '../../assets/Images/big-phone.png'


const Home = () => {

  return (
    <div className="navbar">
      <div className="container">
        <ul>
          <li>Home</li>
          <li>Services</li>
          <li>Products</li>
          <li>Login</li>
        </ul>
        <div className="menu-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      <hr />
       <div className='hero'>
        <div class="text-content">
          <h1>STUDENTS MOVEMENT APPLICATION</h1>
          <p>An application  that tracking student movements
            between schools within a district or region.
            This includes managing transfer requests,
            ensuring timely communication between educational institutions,
            and maintaining accurate records of student transfers.</p>
          <p>Check out our brand new website:</p>
          <a href="#" className="explore-btn">
            Explore
            <span className="search-icon">🔍</span>
          </a>
        </div>   
    </div>
    </div>
  )
}

export default Home