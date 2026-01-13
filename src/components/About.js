import React from 'react';
import Card from './Card';

const About = () => {
  // Check if URL contains /se/ for Swedish content
  const isSwedishSite = window.location.pathname.includes('/se/');
  
  const aboutCards = [
    {
      title: "Background",
      description: isSwedishSite 
        ? "I am an Australian-English professional migrating to Sweden, bringing a dual foundation in Electrical Engineering (Electronics) and Applied Mathematics. By working full-time in Operations, IT, and freelance roles while pursuing two undergraduate degrees plus honours, I have developed a relentless work ethic and a versatile, interdisciplinary skill set."
        : "I am an Australian-English professional with a dual foundation in Electrical Engineering (Electronics) and Applied Mathematics. By working full-time in Operations, IT, and freelance roles while pursuing two undergraduate degrees plus honours, I have developed a relentless work ethic and a versatile, interdisciplinary skill set.",
    },
    {
      title: "Philosophy",
      description: "I believe operations research and data science are hugely beneficial tools for sustainable, human-centric impact. While applied science is inherently ethically neutral, I aspire to see it move beyond mere localised efficiency gains toward true systemic optimisations that respect the individual, society and environmental resources. By integrating interdisciplinary expertise within teams, we can use mathematical analysis and dynamic technology to build a more resilient and forward-thinking future.",
    },
    {
      title: "Interests",
      description: "When I'm not working, you can find me exploring new technologies, designing LED light Sculptures or enjoying outdoor activities such as scuba diving. I have a diverse taste in music, movies, books and podcasts. I love Caribbean, Indian and Indonesian food. I have a long term partner and a cat.",
    },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="cards-grid">
          {aboutCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              className="about-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;