import React from "react";
import styles from "./Header.module.css";
import foodImage from "../../../assets/meals.jpg";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

interface IHeaderProps {
  onShowCart: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={foodImage} alt="Foods" />
      </div>
    </>
  );
};

export default Header;
