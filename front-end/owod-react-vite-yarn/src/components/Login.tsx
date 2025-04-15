import React, {useState} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();
    
    const handleSignup = () => {
        navigate('/signup');
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        // Here you would typically make an API call for authentication
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-tabs">
                    <button onClick={handleSignup} className="tab-button tab-signup">Sign up</button>
                    <button className="tab-button tab-login tab-active">Log in</button>
                </div>

                <h2 className="login-title">Login</h2>

                <button className="google-login-button">
                    {/* <img src={googleLogo} alt="Google Logo" className="google-logo" /> */}
                    <span>Login with Google</span>
                </button>

                <div className="or-separator">
                    <hr className="separator-line" />
                    <span className="or-text">OR</span>
                    <hr className="separator-line" />
                </div>

                <form onSubmit={handleLogin} className="email-login-form">
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
                    <div className="input-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-button"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <a href="#" className="forgot-password-link">Forget password?</a>

                    <button type="submit" className="login-submit-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;