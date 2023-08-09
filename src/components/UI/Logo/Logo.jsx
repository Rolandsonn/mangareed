import React from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/icon/logo.svg";
const Logo = ({ className }) => {
  return (
    <div>
      <Link className={styles.logo} to={"/"}>
        <img src={logo} alt="logo" />
        <div className={styles.wrapper}>
          <b>MangoRead</b>
          <span className={styles[className]}>Читай мангу с нами</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
