import React from 'react';

const LandingPage = ({ onButtonClick }) => {
  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={onButtonClick}>Ir a la página de inicio</button>
    </div>
  );
}

export default LandingPage;