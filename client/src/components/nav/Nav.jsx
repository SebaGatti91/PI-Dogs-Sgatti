import React from "react";
import Button from "../button/Button";
import styles from "./Nav.module.css"; // Importa los estilos CSS

const Nav = () => {
  return (
    <nav className={styles.navContainer}>
      <Button link="/add" text="Agregar Perro" />
      <Button link="/home" text="Home" />
    </nav>
  );
};

export default Nav;