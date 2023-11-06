import React from "react";
import styles from "./DogCard.module.css";
import { Link } from "react-router-dom";

const DogCard = ({ id, name, image, temperament, weight }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <Link to={`/detail/${id}`}>{name}</Link>
        <p>
          <strong>Temperamento:</strong> {temperament}
        </p>
        <p>
          <strong>Peso:</strong> {weight} kg
        </p>
      </div>
      <img src={image} alt={name} />
    </div>
  );
};

export default DogCard;
