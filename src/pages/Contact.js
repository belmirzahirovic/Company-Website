import React from "react";
import styles from "../App.module.css";

const Contact = () => {
  return (
    <div
      id="contact"
      className={styles.pageContent}
      style={{ backgroundColor: "#ffc500" }}
    >
      <h1 className={styles.pageTitle} style={{ color: "#26222b" }}>
        Contact Us
      </h1>
      <p style={{ color: "#26222b" }}>Get in touch with us for any inquiries</p>
    </div>
  );
};

export default Contact;
