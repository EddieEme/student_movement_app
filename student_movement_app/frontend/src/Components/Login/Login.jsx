import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Login.css';

const Login = () => {
    // const styles = {
    //     pageContainerStyle: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     minHeight: '100vh',
    //     },
        
    // };

    return ( 
        <div className='page-container'>
            <div className='nav-container'>
                <Navbar />
            </div>
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">LOGIN</h2>
                    <div className="login-divider"></div>
                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;