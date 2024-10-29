import React, { useEffect, useState } from 'react'
import './LoginNavbar.css'
import sms_logo from '../../assets/Images/sms-logo.png'
import user_image from '../../assets/Images/user-image.png'
import { Bell } from 'lucide-react'
import { logout } from '../Logout'

const LoginNavbar = () => {
    const [logoutVisible, setLogoutVisible] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        schoolName: '',
        schoolCode: ''
    });

    useEffect(() => {
        // Get user info from localStorage
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            try {
                const parsedInfo = JSON.parse(storedUserInfo);
                setUserInfo(parsedInfo);
            } catch (error) {
                console.error('Error parsing user info:', error);
            }
        }
    }, []);
    
    const toggleLogout = () => {
        setLogoutVisible(!logoutVisible);
    };

    const handleLogout = () => {
        logout(); // call the logout function
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    };

    const messageCount = 5;
    
    return (
        <nav className='login-nav'>
            <div className="login-img">
                <img src={sms_logo} alt="Logo" className="rounded-full" />
                <span className="school-name">{userInfo.schoolName}</span>
                {userInfo.schoolCode && (
                    <span className="school-code">({userInfo.schoolCode})</span>
                )}
            </div>
            
            <div className='login-img'>
                <div className="bell">
                    <Bell className="notification-bell" />
                    <div className="notification-count">
                        {messageCount > 0 && (
                            <span className="msg-number">{messageCount}</span>
                        )}
                    </div>
                </div>
                
                <div className='user-details' onClick={toggleLogout}>
                    <img 
                        src={user_image} 
                        alt="User" 
                        className="user-image" 
                    />
                    <span className='user-name'></span>
                    
                    <div className={`logout ${logoutVisible ? 'show-logout' : ''}`}>
                        <ul>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LoginNavbar;