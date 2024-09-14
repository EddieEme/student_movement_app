import React, { useState } from 'react'
import './LoginNavbar.css'
import sms_logo from '../../assets/Images/sms-logo.png'
import user_image from '../../assets/Images/user-image.png'
import { Bell } from 'lucide-react'

const LoginNavbar = () => {
    const [logout, setLogout] = useState(false)
    const toggleLogout = () => {
        setLogout(!logout)
    }
    const messageCount = 5;
    return (
        <nav className='login-nav'>
            <div className="login-img">
                <img src={sms_logo} alt="Logo" className="rounded-full" />

            </div>
            <div className='login-img'>
                <div className="bell">
                    <Bell className="notification-bell" />

                    <div className="notification-count">
                        {messageCount > 0 && (<span className="msg-number"> {messageCount} </span>)}
                    </div>
                </div>
                <div className='user-details' onClick={toggleLogout}>
                <img src={user_image} alt="User" className="user-image" />
                <span className='user-name'>Edison</span>
                <div className={`logout ${logout ? 'show-logout' : ''}`}>
                    <ul>
                        <li>Logout</li>
                    </ul>
                </div>

                </div>
              
            </div>



        </nav>
    )
}

export default LoginNavbar