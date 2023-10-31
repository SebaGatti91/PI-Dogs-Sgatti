import Button from "../button/Button";


const Nav = () => {
  return (
    <nav>
        <Button link="/add" text="Agregar Perro" />
        <Button link="/home" text="Home" />
    </nav>
  );
};

export default Nav;
