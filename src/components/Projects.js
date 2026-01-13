import React from 'react';
import Card from './Card';

const Projects = () => {
  const projectCards = [

    {
      title: "5G-Enabled 360 Robotics Safety Platform",
      description: "A Project for Nokia to showcase proprietary 8K 360° camera system with 5G connectivity on a mobile robotics platform for automated site safety using YOLO machine learning for PPE detection.",
      image: `${process.env.PUBLIC_URL}/images/projects/Nokia.jpg`
    },
    {
      title: "Honours Thesis: Optimisation of Modular Electronic Design",
      description: "Balancing Cost and Design: Creating a Modular LED Art Sculpture & Developing a Tool for Optimal Component Selection - Focus: Electronic Design, Optimisation & Operations Research",
      image: `${process.env.PUBLIC_URL}/images/projects/Hons.jpg`
    },
    {
      title: "Synaptic Array",
      description: "Following 2 rounds of selection, LED art installation “Synaptic Array” successfully awarded for inclusion in the “walk of light” around Circular Quay for Vivid 2017. Funding granted by Destination NSW",
      image: `${process.env.PUBLIC_URL}/images/projects/SynapticArray.jpg`
    },
            {
      title: "Untitled Art Piece",
      description: "Modular LED art installation – In latter stage of programming and testing before exhibition.",
      image: `${process.env.PUBLIC_URL}/images/projects/Untitled.jpg`,
      workInProgress: true
    },
        {
      title: "TheoryTown",
      description: "Full-Stack development of Object-Oriented Web-App with unique design and underlying algorithms designed for collaborative knowledge sharing and p2p validation.",
      image: `${process.env.PUBLIC_URL}/images/projects/TT.jpg`,
      workInProgress: true
    },
        {
      title: "IllumiLux",
      description: "Home ambient lighting system, configurable by user based on previous work in electronics design and LED animation.",
      image: `${process.env.PUBLIC_URL}/images/projects/IllumiLux.jpg`,
      workInProgress: true
    },

  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="cards-grid">
          {projectCards.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
              linkText={project.linkText}
              className="project-card"
              workInProgress={project.workInProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;