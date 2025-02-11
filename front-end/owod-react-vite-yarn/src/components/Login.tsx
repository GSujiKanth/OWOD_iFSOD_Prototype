import React, {useState} from 'react';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, serPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
        // api call for authendication 
        // haven't done yet
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => serPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;