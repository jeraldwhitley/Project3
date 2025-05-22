import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './footer.css'

const Footer = () => {
  return (
    <div>
         <footer className='footer'>
      <div className="social-links">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} /> 
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} /> 
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTiktok} /> 
        </a>
      </div>
   
      <p>&copy; MindSpace</p>
    </footer>
    </div>
  )
}

export default Footer