import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 ALX Portfolio Project. All rights reserved.</p>
        <ul className="footer-social-media">
          {/* Person 1 Links */}
          <li>
            <h4>Emeremnu Edison</h4>
            <div className='links'>
              <a href="mailto:edisonemeremu@gmail.com" className="footer-link">
                <i className="fas fa-envelope"></i> Email
              </a>
              <a href="https://github.com/EddieEme" target="_blank" rel="noopener noreferrer" className="footer-link">
                <i className="fab fa-github"></i> GitHub
              </a>
            </div>

          </li>

          {/* Person 2 Links */}
          <li>
            <h4>Tasie Ibiam</h4>
            <div className='links'>
              <a href="mailto:tasieibiam28.com" className="footer-link">
                <i className="fas fa-envelope"></i> Email
              </a>
              <a href="https://github.com/tasmoligo" target="_blank" rel="noopener noreferrer" className="footer-link">
                <i className="fab fa-github"></i> GitHub
              </a>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
