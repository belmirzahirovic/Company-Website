import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const showAdminLink =
    new URLSearchParams(location.search).get("showAdmin") === "true";

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const navbar = document.querySelector(`.${styles.navbar}`);
    const navbarHeight = navbar.offsetHeight;

    if (section) {
      const sectionTop =
        section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className={styles.navItem}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
            className={styles.navItem}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
            className={styles.navItem}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className={styles.navItem}
          >
            Contact
          </a>
        </li>
        {showAdminLink && (
          <li>
            <a href="/admin" className={styles.navItem}>
              Admin
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
