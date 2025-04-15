import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate('/login');
    }

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}`);
        // Here you would typically make an API call for signup
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-tabs">
                    <button className="tab-button tab-signup tab-active">Sign up</button>
                    <button onClick={handleLogin} className="tab-button tab-login">Log in</button>
                </div>

                <h2 className="signup-title">Sign up</h2>

                <button className="google-signup-button">
                    {/* <img src={googleLogo} alt="Google Logo" className="google-logo" /> */}
                    <span>Sign up with Google</span>
                </button>

                <div className="or-separator">
                    <hr className="separator-line" />
                    <span className="or-text">OR</span>
                    <hr className="separator-line" />
                </div>

                <form onSubmit={handleSignup} className="email-signup-form">
                    <div className="input-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="signup-submit-button">Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;