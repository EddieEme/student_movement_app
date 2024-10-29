import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './AddStudent.css';
import LoginNavbar from '../LoginNavbar/LoginNavbar';
import SideNavbar from '../SideNavbar/SideNavbar';
import NigeriaStatesLGAs from '../NigeriaStatesLGAs/NigeriaStatesLGAs';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';
const generateStudentID = () => `STU-${uuidv4().slice(0, 8)}`;

const AddStudent = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentID, setStudentID] = useState(generateStudentID());

  useEffect(() => {
    // Check if tokens exist in localStorage
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('Initial token check:', { 
      hasAccessToken: !!accessToken, 
      hasRefreshToken: !!refreshToken 
    });
    
    if (!accessToken || !refreshToken) {
      console.log('No tokens found, redirecting to login');
      navigate('/login');
    }
  }, [navigate]);

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedLGA('');
  };

  const handleLGAChange = (e) => {
    setSelectedLGA(e.target.value);
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log('Token expiration check:', {
        tokenExp: decoded.exp,
        currentTime: currentTime,
        isExpired: decoded.exp < currentTime
      });
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  const refreshAccessToken = async () => {
    console.log('Attempting to refresh access token');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      console.error('No refresh token found in localStorage');
      throw new Error('No refresh token found');
    }

    try {
      console.log('Making refresh token request');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/refresh/',
        { refresh: refreshToken }
      );

      console.log('Refresh token response:', response.data);
      const newAccessToken = response.data.access;
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error.response || error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error('Failed to refresh token');
    }
  };

  const getValidAccessToken = async () => {
    console.log('Getting valid access token');
    let accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      console.error('No access token in localStorage');
      throw new Error('No access token found');
    }

    console.log('Checking if token is expired');
    if (isTokenExpired(accessToken)) {
      console.log('Token is expired, attempting to refresh');
      try {
        accessToken = await refreshAccessToken();
      } catch (error) {
        console.error('Error during token refresh:', error);
        throw new Error('Session expired. Please login again.');
      }
    }

    return accessToken;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    const studentData = {
      student_id: e.target.student_id.value,
      student_name: e.target.student_name.value,
      date_of_birth: e.target.dob.value,
      state_of_origin: selectedState,
      lga_of_origin: selectedLGA,
      town: e.target.town.value,
      student_class: e.target.student_class.value,
    };

    try {
      console.log('Starting form submission');
      const token = await getValidAccessToken();
      console.log('Got valid token:', token ? 'Token exists' : 'No token');

      const response = await axios.post(
        'http://127.0.0.1:8000/api/add_student/',
        studentData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Student add response:', response.data);
      setSuccessMessage(`Student ${studentData.student_name} added successfully!`);
      e.target.reset();
      setSelectedState('');
      setSelectedLGA('');
      setStudentID(generateStudentID());
    } catch (error) {
      console.error('Submission error:', error);
      
      if (error.message === 'No access token found' || error.message === 'Failed to refresh token') {
        setError('Your session has expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError('Session expired. Please login again.');
          setTimeout(() => navigate('/login'), 2000);
        } else if (error.response) {
          setError(error.response.data.message || 'Failed to add student. Please try again.');
        } else if (error.request) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else {
        setError(error.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-student">
      <LoginNavbar />
      <div className="addstudent-content">
        <SideNavbar />
        <div className="addstudent-main">
          <div className="student-form">
            <div className="login-card">
              <h2 className="login-title">Add Student</h2>
              <div className="login-divider"></div>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="alert" 
                    aria-label="Close"
                    onClick={() => setError('')}
                  ></button>
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="alert" 
                    aria-label="Close"
                    onClick={() => setSuccessMessage('')}
                  ></button>
                </div>
              )}

              {/* {error && <div className="error-message">{error}</div>} */}
              <form className="login-form" onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="student_id">Student ID</label>
                  <input type="text" id="student_id" name="student_id" value={studentID} readOnly required />
                </div>
                <div className="form-group">
                  <label htmlFor="student_name">Student Name (Full)</label>
                  <input type="text" id="student_name" name="student_name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" id="dob" name="dob" required />
                </div>
                <div className="form-group">
                  <label htmlFor="town">Town</label>
                  <input type="text" id="town" name="town" />
                </div>
                <div className="form-group">
                  <label htmlFor="student_class">Student Class</label>
                  <input type="text" id="student_class" name="student_class" />
                </div>
                <NigeriaStatesLGAs 
                  selectedState={selectedState} 
                  onStateChange={handleStateChange} 
                  selectedLGA={selectedLGA} 
                  onLGAChange={handleLGAChange} 
                />
                <button 
                  type="submit" 
                  className="login-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;