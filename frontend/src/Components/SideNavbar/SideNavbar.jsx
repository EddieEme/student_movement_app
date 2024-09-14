import React, { useState } from 'react'
import './SideNavbar.css'
import dashboard_icon from '../../assets/Images/dashboard-icon.png'
import student_icon from '../../assets/Images/student-icon.png'
import notification_icon from '../../assets/Images/notification-icon.png'
import transfer_icon from '../../assets/Images/transfer-icon.png'
import menu_icon from '../../assets/Images/menu-icon.png'
import { Link } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import AddStudent from '../AddStudent/AddStudent'


const SideNavbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false)
    
    const toggleMenu = () => {
        setMobileMenu(!mobileMenu)
    }
    


  return (
      <nav className={`side-nav ${mobileMenu?'show-sidenav' :''}`}>
          <img src={menu_icon} alt="" className='side-menu-icon' onClick={toggleMenu} />
          <ul className={`sidenav-content ${mobileMenu?'show-sidenav' :''}`}>
            <Link to='/dashboard' element={<Dashboard/>} ><span className='icon-box'><img src={dashboard_icon} alt="" className='icons'/><li >Dashboard</li></span></Link>
              <Link to='/addstudent' element={<AddStudent/>}><span className='icon-box'><img src={student_icon} alt="" className='icons'/> <li>Add Student</li></span></Link>
             <span className='icon-box'><img src={transfer_icon} alt="" className='icons'/><li>Transfer</li></span>
              <span className='icon-box'><img src={notification_icon} alt="" className='icons'/><li>Notification</li></span>
          </ul>
          
    </nav>
  )
}

export default SideNavbar