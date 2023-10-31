import React from "react";
import styles from "./DogCard.module.css";

const DogCard = ({ id, name, image, temperament, weight }) => {
  return (
    <div className={styles.info}>
      <h2>{name}</h2>
      <p>Temperamento: {temperament}</p>
      <p>Peso: {weight} kg</p>
      <div className={styles.card}>
        <img src={image} alt={name} width={200} />
      </div>
    </div>
  );
};

export default DogCard;
