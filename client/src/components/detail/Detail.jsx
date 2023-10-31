import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {

  const { id } = useParams();

  const [dog, setDog] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/dogs/${id}`)
    .then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  return (
    <div className={styles.detail}>
      <h3>Id: {dog?.id}</h3>
      <h3>Name: {dog?.name}</h3>
      <h3>Altura: {dog?.height}</h3>
      <h3>Peso: {dog?.weight}</h3>
      <h3>Años de vida: {dog?.life_span}</h3>
      <h3>Temprament: {dog?.temperament}</h3>
      <img src={dog?.image} alt={dog?.name} /> 
    </div>
  );
};

export default Detail;