import React from 'react';

const Card = ({ 
  title, 
  description, 
  image, 
  link, 
  linkText = "Learn More",
  className = "",
  children,
  onClick,
  workInProgress
}) => {
  const CardContent = () => (
    <div className={`card ${className}`}>
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        {children}
        {link && (
          <a 
            href={link} 
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        )}
        {workInProgress && (
          <div className="work-in-progress">
            Work in Progress
          </div>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div className="card-wrapper" onClick={onClick} style={{ cursor: 'pointer' }}>
        <CardContent />
      </div>
    );
  }

  if (link && !children) {
    return (
      <a 
        href={link} 
        className="card-wrapper card-link-wrapper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardContent />
      </a>
    );
  }

  return (
    <div className="card-wrapper">
      <CardContent />
    </div>
  );
};

export default Card;