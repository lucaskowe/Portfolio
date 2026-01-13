import React, { useEffect } from 'react';

const CircuitBackground = () => {
  useEffect(() => {
    // Check if canvas already exists
    let canvas = document.getElementById('circuitCanvas');
    if (!canvas) {
      // Create and add the canvas element
      canvas = document.createElement('canvas');
      canvas.id = 'circuitCanvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)';
      canvas.style.zIndex = '-1';
      canvas.style.pointerEvents = 'none';
      
      // Add canvas to body
      document.body.appendChild(canvas);
    }

    // Check if CSS is already loaded
    const cssPath = `${process.env.PUBLIC_URL}/circuit-background.css`;
    if (!document.querySelector(`link[href="${cssPath}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
    }

    // Check if script is already loaded
    const jsPath = `${process.env.PUBLIC_URL}/circuit-background.js`;
    if (!document.querySelector(`script[src="${jsPath}"]`)) {
      const script = document.createElement('script');
      script.src = jsPath;
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove canvas when component unmounts
      const existingCanvas = document.getElementById('circuitCanvas');
      if (existingCanvas && existingCanvas.parentNode) {
        existingCanvas.parentNode.removeChild(existingCanvas);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default CircuitBackground;