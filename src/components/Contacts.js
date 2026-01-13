import React from 'react';
import Card from './Card';

const Contacts = () => {
  const contactInfo = [
    {
      title: "Email",
      value: "lucaskowe@gmail.com",
      link: "mailto:lucaskowe@gmail.com",
      icon: "✉️"
    },
    {
      title: "Phone",
      value: "+61 423 089 841",
      link: "tel:+61423089841",
      icon: "📞"
    },
    {
      title: "Location",
      value: "Sydney, Australia",
      link: "https://maps.google.com/?q=Sydney,+Australia",
      icon: "📍"
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/lucaskowe",
      link: "https://linkedin.com/in/lucaskowe",
      icon: "💼"
    }
  ];

  return (
    <section id="contacts" className="section contacts-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-cards-grid">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              className="contact-info-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="contact-info-card">
                <div className="contact-info-content">
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-details">
                    <h4>{info.title}</h4>
                    <p>{info.value}</p>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contacts;