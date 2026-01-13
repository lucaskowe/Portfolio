import React, { useState, useEffect } from 'react';
import Card from './Card';

const Home = ({ scrollToSection }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  
  // Check if URL contains /se/ for Swedish content
  const isSwedishSite = window.location.pathname.includes('/se/');
  
  // Pad all greetings to same length (6 characters)
  const greetings = isSwedishSite ? [
    ['\u00A0','H', 'e', 'j', '!', '\u00A0'],
    ['H', 'e', 'l', 'l', 'o', '!']
  ] : [
    ['H', 'e', 'l', 'l', 'o', '!']
  ];

  const [displayedChars, setDisplayedChars] = useState(greetings[0]);

  useEffect(() => {
    const targetGreeting = greetings[greetingIndex];
    
    // Cascade effect: change each character with a delay
    targetGreeting.forEach((char, index) => {
      setTimeout(() => {
        setDisplayedChars(prev => {
          const newChars = [...prev];
          newChars[index] = char;
          return newChars;
        });
      }, index * 100); // 100ms delay between each character
    });

    // Move to next greeting after all characters have flipped + pause
    const totalFlipTime = targetGreeting.length * 100 + 1500; // flip time + 1.5s pause
    const timeout = setTimeout(() => {
      setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, totalFlipTime);

    return () => clearTimeout(timeout);
  }, [greetingIndex]);

  return (
    <section id="home" className="section home-section">
      <div className="container">
        <Card className="hero-card">
          <div className="hero-content">
            <div className="profile-image">
              <img 
                src={`${process.env.PUBLIC_URL}/images/Headshot.jpeg`}
                alt="Profile" 
                className="profile-img"
              />
            </div>
            <div className="hero-text">
              <div className="hero-greeting">
                <strong className="flip-display">{displayedChars.join('')}</strong>
              </div>
              <p className="hero-description">
                I'm Lucas, an Electrical Engineer and Applied Mathematician with over a decade of experience in electronic design, data science, and operations management.
                <br/><br/>I specialise in Operations Research and Business Intelligence, using analytical models to drive growth and streamline complex technical systems. 
                <br/><br/>My professional interests lie at the intersection of project management, optimisation, and modular electronic design.
                <br/><br/>I am also a visual artist, I create digital electronic art, <br/>using custom PCBs and dynamic LED animation.
              </p>
              <div className="hero-links">
                <button 
                  className="btn btn-primary"
                  onClick={() => scrollToSection('contacts')}
                >
                  Get In Touch
                </button>
                <a 
                  href="https://www.linkedin.com/in/lucaskowe/" 
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/lucaskowe" 
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a 
                  href={`${process.env.PUBLIC_URL}/LucasKoweCV2026.pdf`}
                  className="btn btn-outline"
                  download="LucasKoweCV2026.pdf"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Home;