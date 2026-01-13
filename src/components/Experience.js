import React from 'react';
import Card from './Card';

const Experience = () => {
  const experienceCards = [
    {
      title: "Electrical Engineer - Team Lead",
      company: "Optik Consultancy x Nokia, Sydney",
      period: "Nov 2025 – Feb 2026",
      images: [`${process.env.PUBLIC_URL}/images/nokia-logo.jpeg`,`${process.env.PUBLIC_URL}/images/optik-logo.jpeg`],
      description: "Led a consultancy cohort of 8 inter-disciplinary engineers to supply Nokia with a proof of concept design showcasing various patented technologies. The project involved retrofitting a mobile robotics platform with 5G connectivity and proprietary 8K 360° camera system to automate site safety using YOLO machine learning for PPE detection.",
      achievements: [
        "Led team of 8 inter-disciplinary engineers",
        "Designed mobile robotics platform with 5G and 8K 360° camera integration",
        "Implemented YOLO machine learning for automated PPE detection",
        "Managed 12-week project including budgeting and technical supervision"
      ]
    },
    {
      title: "Database Administrator",
      company: "Australian Film, Television and Radio School, Sydney",
      period: "Jun 2024 – Nov 2025",
      image: `${process.env.PUBLIC_URL}/images/aftrs-logo.jpeg`,
      description: "Facilitated ETL integrations across identity directories, authentication services, learning platforms and cloud services. Led infrastructure development and provided technical support for a national school of 3000 students.",
      achievements: [
        "Managed databases ranging from 500 to 2000+ records",
        "Facilitated infrastructure upgrades and automation development",
        "Streamlined management processes for 3000+ student institution",
        "Provided comprehensive technical support to academic staff and students"
      ]
    },
    {
      title: "Technical Consultant",
      company: "Freelance, Sydney",
      period: "Mar 2023 - Present",
      image: `${process.env.PUBLIC_URL}/images/freelance-logo.jpeg`,
      description: "Leading web development projects and design work, collaborating with academics and stakeholders to host digital creative content. Managed production of publications for a large Aboriginal Corporation and provided comprehensive technical assistance.",
      achievements: [
        "Led web development projects with key analytics tracking for research",
        "Produced 10 print-ready and 10 digital books for Wonnarua Nation Aboriginal Corporation",
        "Collaborated with academics, stakeholders and webmasters",
        "Provided ongoing technical consultation and support"
      ]
    },
    {
      title: "Operations Manager",
      company: "Noble Works Australia, Sydney",
      period: "Feb 2017 - Mar 2023",
      image: `${process.env.PUBLIC_URL}/images/NWA-logo.jpeg`,
      description: "Developed business intelligence solutions and operations research insights that aided company growth up to 200% YoY. Oversaw day-to-day operations, managed expenditures, and led compliance initiatives for demolition and safety documentation.",
      achievements: [
        "Developed Power BI costings model tracking 300+ projects from small budget to multi-million dollar",
        "Achieved up to 200% year-over-year company growth through strategic insights",
        "Created website and automation systems reducing administrative costs",
        "Led compliance initiatives for Health and Safety documentation for government and private clients"
      ]
    },
    {
      title: "Previous Employment",
      company: "",
      period: "",
      description: "",
      achievements: [],
      isPreviousEmployment: true,
      employmentList: [
        { position: "Research Assistant - Institute of Positive Psychology and Education, Australian Catholic University", period: "2014 - 2016" },
        { position: "Research Assistant - Centre of Positive Psychology and Education, Western Sydney University", period: "2011 - 2014" },
        { position: "Administrator - Ord Minnett", period: "2009 - 2010" }
      ]
    }
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="experience-timeline">
          {experienceCards.map((exp, index) => (
            <Card
              key={index}
              className="experience-card"
            >
              <div className="experience-content">
                {!exp.isPreviousEmployment ? (
                  <div className="experience-with-image">
                    <div className="experience-image">
                      {exp.images ? (
                        <>
                          <img key={0} src={exp.images[0]} alt={`${exp.company} logo 1`} />
                          <div className="logo-connector">✕</div>
                          <img key={1} src={exp.images[1]} alt={`${exp.company} logo 2`} />
                        </>
                      ) : (
                        <img src={exp.image} alt={`${exp.company} logo`} />
                      )}
                    </div>
                    <div className="experience-text">
                      <div className="experience-header">
                        <h3 className="experience-title">{exp.title}</h3>
                        <div className="experience-meta">
                          <span className="company">{exp.company}</span>
                          <span className="period">{exp.period}</span>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="experience-description">{exp.description}</p>
                      )}
                      {exp.achievements.length > 0 && (
                        <div className="achievements">
                          <h4>Key Achievements:</h4>
                          <ul>
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="experience-header">
                      <h3 className="experience-title">{exp.title}</h3>
                    </div>
                    <div className="previous-employment-list">
                      {exp.employmentList.map((employment, empIndex) => (
                        <div key={empIndex} className="experience-meta">
                          <span className="company">{employment.position}</span>
                          <span className="period">{employment.period}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;