import React from "react";
import styles from "../App.module.css";
import logo from "../images/logo.svg";

const Home = () => {
  return (
    <div id="home" className={styles.pageContent}>
      <h1 className={styles.pageTitle}>Hidden Name</h1>
      <p>
        We provide excellent services and have a portfolio of successful
        projects
      </p>
      <img src={logo} className={styles.logo} alt="TermTec Logo" />
    </div>
  );
};

export default Home;
