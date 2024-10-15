import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Projects.module.css";
import buildingImage from "../assets/building.jpg";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const nextProject = () => {
    if (currentIndex < projects.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevProject = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openLightbox = (project) => {
    setCurrentProject(project);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentImageIndex < currentProject.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div
      id="projects"
      className={`${styles.pageContent} ${styles.projectsContainer}`}
    >
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.mainTitle}>
            browse our projects below <br></br>& learn more work we have done.
          </h1>
        </div>
        <p className={styles.description}>
          Our diverse portfolio represents decades of experience backed by a
          passion for quality, outstanding client service and the latest
          industry technologies.
        </p>
      </div>
      <div className={styles.projectsGridWrapper}>
        {projects.length > 0 ? (
          <div
            className={styles.projectsGrid}
            style={{
              transform: `translateX(calc(-${currentIndex * 50}% - ${
                currentIndex * 1
              }rem))`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className={styles.projectCard}
                onClick={() => openLightbox(project)}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={
                      project.images && project.images.length > 0
                        ? `http://localhost:5001${project.images[0]}`
                        : buildingImage
                    }
                    alt={project.title}
                    className={styles.projectImage}
                  />
                </div>
                <div className={styles.infoContainer}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                  <div className={styles.projectDetails}>
                    <div>
                      <h4>LOCATION</h4>
                      <p>{project.location}</p>
                    </div>
                    <div>
                      <h4>CLIENT</h4>
                      <p>{project.client}</p>
                    </div>
                    <div className={styles.hoverInfo}>
                      <h4>COMPLETED</h4>
                      <p>{project.completed}</p>
                    </div>
                    <div className={styles.hoverInfo}>
                      <h4>SIZE</h4>
                      <p>{project.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No projects available.</p>
        )}
      </div>
      <div className={styles.transitionIndicators}>
        {projects.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex || index === currentIndex + 1
                ? styles.active
                : ""
            }`}
          />
        ))}
      </div>
      <div className={styles.navigationButtons}>
        <button
          onClick={prevProject}
          className={`${styles.navButton} ${
            currentIndex === 0 ? styles.disabled : ""
          }`}
          disabled={currentIndex === 0}
        >
          ←
        </button>
        <button
          onClick={nextProject}
          className={`${styles.navButton} ${
            currentIndex >= projects.length - 2 ? styles.disabled : ""
          }`}
          disabled={currentIndex >= projects.length - 2}
        >
          →
        </button>
      </div>

      {lightboxOpen && currentProject && (
        <div className={styles.lightbox}>
          <button className={styles.closeLightbox} onClick={closeLightbox}>
            ×
          </button>
          <img
            src={`http://localhost:5001${currentProject.images[currentImageIndex]}`}
            alt={currentProject.title}
            className={styles.lightboxImage}
          />
          <div className={styles.lightboxControls}>
            <button onClick={prevImage} disabled={currentImageIndex === 0}>
              Previous
            </button>
            <button
              onClick={nextImage}
              disabled={currentImageIndex === currentProject.images.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
