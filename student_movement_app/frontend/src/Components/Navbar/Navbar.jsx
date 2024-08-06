import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import menu_icon from '../../assets/Images/menu-icon.png'
import './Navbar.css'

const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    
    const toggleMenu = () => {
        setMobileMenu(!mobileMenu);
    }

    return (
        <nav className="navbar">
            <div className="container">
                 <div className="menu-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <ul className={mobileMenu ? 'show-mobile-menu' : ''}>
                    <li><Link to='/' className='link'>Home</Link></li>
                    <li>Services</li>
                    <li>Products</li>
                    <li><Link to='/login' className='link'>Login</Link></li>
                </ul>
               
                <img src={menu_icon} alt="Menu" className='menu-icon' onClick={toggleMenu} />
            </div>
            <hr />
        </nav>
    )
}

export default Navbar