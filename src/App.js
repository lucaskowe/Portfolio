import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contacts from './components/Contacts';
import CoverLetter from './components/CoverLetter';
import Reflections from './components/Reflections';
import CircuitBackground from './components/CircuitBackground';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  
  // Check if URL contains /EPR for extended portfolio
  const isEPRSite = window.location.pathname.includes('/EPR');

  useEffect(() => {
    const handleScroll = () => {
      const baseSections = ['home', 'about', 'projects', 'skills', 'experience', 'contacts'];
      const eprSections = ['coverletter', 'reflections'];
      const sections = isEPRSite ? [...baseSections.slice(0, -1), ...eprSections, baseSections[baseSections.length - 1]] : baseSections;
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <CircuitBackground />
      <Navigation 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      <main>
        <Home scrollToSection={scrollToSection} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        {isEPRSite && <CoverLetter />}
        {isEPRSite && <Reflections />}
        <Contacts />
      </main>
    </div>
  );
}

export default App;