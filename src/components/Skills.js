import React from 'react';
import Card from './Card';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming & Development",
      skills: ["Python", "R", "C/C#/C++", "HTML & CSS", "JavaScript", "PHP", "SQL", "M (Power Query)", "DAX", "Google Apps Script"],
      description: "Expert/Proficient in multiple programming languages and development frameworks for diverse technical solutions."
    },
    {
      title: "Core Expertise",
      skills: ["Electronics", "Business Intelligence", "Data Analytics", "Digital Design", "Operations Research", "Risk Management", "Project Management", "IT Systems"],
      description: "Specialised knowledge areas spanning engineering, business analysis, and strategic management."
    },
    {
      title: "Software & Tools",
      skills: ["Power BI", "Excel", "MATLAB", "AutoCAD", "KiCad", "Git", "VS Code", "Matlab", "RStudio", "Database Management Systems", "JIRA", "Confluence", "Google Workspace", "Microsoft 365"],
      description: "Professional software tools and platforms for engineering, data analysis, and development workflows."
    },
    {
      title: "Professional Certifications",
      skills: ["PCEP-30-02 Python Institute Programmer", "UEERL0003 Electrical Appliance Safety Testing", "PUAEQU001 Emergency Response Equipment", "HLTAID011 Provide First Aid"],
      description: "Industry-recognised certifications demonstrating technical competency and safety compliance."
    },
        {
      title: "Languages",
      skills: ["English (Native)", "Swedish (Conversational)"],
      description: "Multilingual communication capabilities."
    }
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="cards-grid">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              title={category.title}
              description={category.description}
              className="skill-card"
            >
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;