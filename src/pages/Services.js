import React from "react";
import styles from "./Services.module.css";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";

const Services = () => {
  const services = [
    {
      icon: icon1,
      title: "Web Development",
      description:
        "Crafting impactful websites for your online success: expert web development tailored to elevate your digital presence.",
    },
    {
      icon: icon2,
      title: "UX/UI Design",
      description:
        "Crafting intuitive interfaces and engaging experiences: our UX/UI design service elevates digital interactions for your brand.",
    },
    {
      icon: icon3,
      title: "Graphics Design",
      description:
        "Captivating visuals that tell your story: our graphics design service brings your brand to life.",
    },
    {
      icon: icon4,
      title: "Digital Marketing",
      description:
        "Strategic campaigns for online success: our digital marketing service boosts your brand's visibility and reach.",
    },
  ];

  return (
    <div id="services" className={styles.servicesContainer}>
      <h2 className={styles.sectionTitle}>What We Can Do For You</h2>
      <h1 className={styles.mainTitle}>Services we can help you with</h1>
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.serviceCardInner}>
              <div className={styles.serviceCardFront}>
                <img
                  src={service.icon}
                  alt={service.title}
                  className={styles.serviceIcon}
                />
                <h3 className={styles.serviceTitle}>{service.title}</h3>
              </div>
              <div className={styles.serviceCardBack}>
                <p className={styles.serviceDescription}>
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
