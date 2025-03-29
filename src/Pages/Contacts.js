import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    
    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'fullName':
                if (value.trim().length < 3) {
                    error = 'Name must be at least 3 characters';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            case 'phone':
                if (value && !/^[+]?[\d\s()-]{7,15}$/.test(value)) {
                    error = 'Please enter a valid phone number';
                }
                break;
            case 'message':
                if (value.trim().length < 10) {
                    error = 'Message must be at least 10 characters';
                }
                break;
            default:
                break;
        }
        
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Validate the field
        const error = validateField(name, value);
        
        // Update errors state
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
        
        // Update form data
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields before submission
        let isValid = true;
        const newErrors = {};
        
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            newErrors[key] = error;
            if (error) isValid = false;
        });
        
        setErrors(newErrors);
        
        if (isValid) {
            console.log('Form submitted:', formData);
            // Here you would typically send the data to your backend
            alert('Thank you for your message! We will get back to you soon.');
            setFormData({ fullName: '', email: '', phone: '', message: '' });
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-content">
                {/* Contact Information Card */}
                <div className="contact-info-card">
                    <h2 className="contact-heading">Contact Information</h2>
                    
                    <div className="contact-info-item">
                        <div className="icon-container">
                            <i className="location-icon">📍</i>
                        </div>
                        <div className="info-text">
                            <h3>Our Address</h3>
                            <p>Rwanda Agricultural Board (RAB) Headquarters KK 30 Ave, Kigali, Rwanda</p>
                        </div>
                    </div>
                    
                    <div className="contact-info-item">
                        <div className="icon-container">
                            <i className="phone-icon">📞</i>
                        </div>
                        <div className="info-text">
                            <h3>Phone</h3>
                            <p>+250 784809876</p>
                        </div>
                    </div>
                    
                    <div className="contact-info-item">
                        <div className="icon-container">
                            <i className="email-icon">✉️</i>
                        </div>
                        <div className="info-text">
                            <h3>Email</h3>
                            <p>agritestpro@gmail.com</p>
                        </div>
                    </div>
                    
                    <div className="contact-info-item">
                        <div className="icon-container">
                            <i className="hours-icon">🕒</i>
                        </div>
                        <div className="info-text">
                            <h3>Business Hours</h3>
                            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                            <p>Saturday: Closed</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
                
                {/* Contact Form Card */}
                <div className="contact-form-card">
                    <h2 className="contact-heading">Send Us a Message</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={errors.fullName ? "error" : ""}
                            />
                            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={errors.phone ? "error" : ""}
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={errors.message ? "error" : ""}
                                rows="5"
                            ></textarea>
                            {errors.message && <span className="error-message">{errors.message}</span>}
                        </div>
                        
                        <div className="button-group">
                            <button type="submit" className="submit-button">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;