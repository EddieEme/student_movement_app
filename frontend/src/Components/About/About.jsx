import React from 'react'
import './About.css'
import Navbar from '../Navbar/Navbar'

function About() {
    return (
        <div className='about-section'>
            <div className='about-nav'>
                <Navbar className />
            </div>
            <div className="about-content">
                <h2>About Student Movement Application</h2>
                <p>
                    As a student transitioning between schools,
                    we faced challenges tracking students movement.
                    To address this,
                    We created the Student Movement Tracker.
                </p>
                <p>
                    The Student Movement Tracker is a project that was developed as part of our studies at Holberton School.
                    This project, is aimed at providing a valuable resource for
                    schools and administrators to better understand student migration patterns and make informed decisions.
                </p>
                <p>
                    I believe that this project has the potential to make a positive impact on the educational landscape by providing a more efficient and effective way to track student movements.
                </p>
                <p>
                    Learn more about my journey and the development of this project on the Holberton School website:
                    <a href="https://www.holbertonschool.com/" target="_blank" rel="noopener noreferrer">
                        Visit Holberton School
                    </a>
                </p>
            </div>

        </div>
    )
}

export default About