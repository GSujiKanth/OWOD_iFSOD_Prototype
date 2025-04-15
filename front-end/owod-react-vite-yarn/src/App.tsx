import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import UploadImage from './components/UploadImage';
import './App.css';
import Signup from './components/SignUp';

const App: React.FC = () => {
  return (
    <Router>
        <div className="app-container">
            <header className="app-header">
                <div className="header-logo"><Link to="/">OWOD</Link></div>
                <nav className="header-nav">
                    <ul>
                        <li><Link to="/about">About</Link></li> {/* Example links, adjust as needed */}
                        <li><Link to="/documentation">Documentation</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> 
                <Route path="/upload" element={<UploadImage />} />
                {/* Add other routes as needed */}
            </Routes>
        </div>  
    </Router>
  )
}

export default App;
