import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_LOGIN_ENDPOINT}`,
                { username, password },
                {
                    withCredentials: true // Important for receiving cookies
                }
            );

            const { refresh, access, user } = response.data;

            if (refresh && access && user) {
                // Store tokens
                localStorage.setItem('refreshToken', refresh);
                localStorage.setItem('accessToken', access);
                
                // Store user info
                localStorage.setItem('userInfo', JSON.stringify({
                    username: user.username,
                    schoolName: user.school,
                    schoolCode: user.school_code
                }));

                // Configure axios defaults for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                
                navigate('/dashboard');
            } else {
                setError('Login successful, but required information is missing');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                setError(`Server error: ${error.response.data.error || error.response.statusText}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                setError('No response received from the server. Please try again.');
            } else {
                console.error('Error message:', error.message);
                setError(`An error occurred: ${error.message}`);
            }
        }
    };

    return (
        <div className='page-container'>
            <div className='nav-container'>
                <Navbar />
            </div>
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">LOGIN</h2>
                    <div className="login-divider"></div>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;