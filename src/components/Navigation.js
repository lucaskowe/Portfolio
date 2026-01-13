import React from 'react';

const Navigation = ({ activeSection, scrollToSection }) => {
  // Check if URL contains /EPR for extended navigation
  const isEPRSite = window.location.pathname.includes('/EPR');
  
  const baseNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
  ];
  
  const eprNavItems = [
    { id: 'coverletter', label: 'Cover Letter' },
    { id: 'reflections', label: 'Reflections' },
  ];
  
  const contactNavItem = { id: 'contacts', label: 'Contact' };
  
  const navItems = isEPRSite 
    ? [...baseNavItems, ...eprNavItems, contactNavItem]
    : [...baseNavItems, contactNavItem];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;