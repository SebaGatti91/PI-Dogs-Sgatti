import React from 'react';
import styles from './LandingPage.module.css'; // Importa los estilos como un objeto

const LandingPage = ({ onButtonClick }) => {
  return (
    <div className={styles['landing-container']}>
      <h1 className={styles['title']}>🐶 Bienvenido a la DogApi 🐶 </h1>
      <button className={styles['button-dog']} onClick={onButtonClick}></button>
    </div>
  );
}

export default LandingPage;