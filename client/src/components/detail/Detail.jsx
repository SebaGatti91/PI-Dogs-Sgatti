import {useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { getDog } from "../../redux/actions";

const Detail = () => {
  
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDog(id));
  }, []);

  const { dog_id } = useSelector((state) => state);

  return (
    <div className={styles.detail}>
      <h3>Id: {dog_id?.id}</h3>
      <h3>Name: {dog_id?.name}</h3>
      <h3>Altura: {dog_id?.height} m</h3>
      <h3>Peso: {dog_id?.weight} kg</h3>
      <h3>Años de vida: {dog_id?.life_span}</h3>
      <h3>Temperamento: {dog_id?.temperament}</h3>
      <img src={dog_id?.image} alt={dog_id?.name} width={200}/> 
    </div>
  );
};

export default Detail;