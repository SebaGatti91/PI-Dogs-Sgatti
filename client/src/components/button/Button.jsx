import { Link } from "react-router-dom"
import styles from "./Button.module.css";

const Button = ({link, text}) => {
    return(
        <Link to={link}>
            <button className={styles.button}>
        {text}
            </button>
        </Link>
    )
}

export default Button;