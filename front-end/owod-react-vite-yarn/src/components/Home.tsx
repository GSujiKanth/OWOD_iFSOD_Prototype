import React from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleStartNow = () => {
        navigate('/upload');
    }

    const handleNewAccount = () => {
        navigate('/signup');
    }

    return (
        <div className="home">
            <section className="hero-section">
                <h1 className="hero-title">Open World <br/> Object Detection</h1>
                <p className="hero-subtitle">Harnessing the power of AI, our system revolutionizes the way objects are detected and learned. Experience unparalleled accuracy with our advanced Open World Object Detection using Incremental Few-Shot Learning.</p>
                <div className="hero-buttons">
                    <button onClick={handleStartNow} className="button-primary">Start now</button>
                    <button onClick={handleNewAccount} className="button-secondary">Create a new account</button>
                </div>
            </section>

            <div className="home-sections-container"> {/* New container div */}
                <section className="features-section">
                    <div className="features-container">
                        <h2 className="features-title">What is Open World Object Detection <br/> ?</h2>
                        <ul className="features-list">
                            <li> Real-Time Detection: Instantly identify known objects with precision.</li>
                            <li> Discover the Unknown: Our AI adapts and learns to recognize new objects on the go.</li>
                            <li> Incremental Learning: Efficiently teach the system new objects with just a few samples.</li>
                        </ul>
                    </div>
                </section>

                <section className="video-section">
                    <div className="video-container">
                        <div className="video-placeholder">
                            <div className="play-button">▶</div> {/* Simple play button using unicode */}
                        </div>
                        <p className="video-caption">What is OWOD ? (1.77)</p>
                    </div>
                </section>
            </div>    
        </div>
    );
};

export default Home;