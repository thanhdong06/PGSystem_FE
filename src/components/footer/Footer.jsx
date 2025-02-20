import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css"; // Import file CSS riêng cho Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Phần About Us */}
        <div className="footer-section about">
          <h3 className="footer-title">About Us</h3>
          <p className="footer-text">
            We are a company dedicated to providing innovative solutions for our customers.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
        </div>
        {/* Phần Our Services */}
        <div className="footer-section services">
          <h3 className="footer-title">Our Services</h3>
          <ul className="footer-list">
            <li><a href="/home" className="footer-link">Home</a></li>
            <li><a href="/aboutus" className="footer-link">About Us</a></li>
            <li><a href="/services" className="footer-link">Services</a></li>
            <li><a href="/contactus" className="footer-link">Contact</a></li>
          </ul>
        </div>
        {/* Phần Newsletter */}
        <div className="footer-section newsletter">
          <h3 className="footer-title">Newsletter</h3>
          <p className="footer-text">Subscribe to our newsletter for updates and offers.</p>
          
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
         
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; 2025 Pregnancy Growth Tracking System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
