import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminPanel.module.css";

axios.defaults.withCredentials = true;

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    location: "",
    client: "",
    completed: "",
    size: "",
    images: [],
  });
  const [message, setMessage] = useState("");
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        handleLogout();
        setMessage("Your session has expired. Please log in again.");
      } else {
        setIsAuthenticated(true);
        fetchProjects();
        // Set up periodic token check
        const intervalId = setInterval(() => {
          if (isTokenExpired(token)) {
            handleLogout();
            setMessage("Your session has expired. Please log in again.");
            clearInterval(intervalId);
          }
        }, 60000); // Check every minute
        return () => clearInterval(intervalId);
      }
    }
  }, []);

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Assume token is expired if it can't be decoded
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      if (error.response && error.response.status === 401) {
        handleLogout();
        setMessage("Your session has expired. Please log in again.");
      } else {
        setMessage("Error fetching projects: " + error.message);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setError("");
      fetchProjects();
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setProjects([]);
    setNewProject({
      title: "",
      description: "",
      location: "",
      client: "",
      completed: "",
      size: "",
      images: [],
    });
    setMessage("You have been logged out.");
  };

  const handleInputChange = (e) => {
    if (e.target.name === "images") {
      setNewProject({ ...newProject, images: Array.from(e.target.files) });
    } else {
      setNewProject({ ...newProject, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (isTokenExpired(token)) {
        handleLogout();
        setMessage("Your session has expired. Please log in again.");
        return;
      }

      const formData = new FormData();
      for (const key in newProject) {
        if (key === "images") {
          for (let i = 0; i < newProject.images.length; i++) {
            formData.append("images", newProject.images[i]);
          }
        } else {
          formData.append(key, newProject[key]);
        }
      }

      if (editingProject) {
        await axios.put(`/api/projects/${editingProject._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Project updated successfully!");
        setEditingProject(null);
      } else {
        await axios.post("/api/projects", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Project added successfully!");
      }
      setNewProject({
        title: "",
        description: "",
        location: "",
        client: "",
        completed: "",
        size: "",
        images: [],
      });
      fetchProjects();
    } catch (error) {
      console.error("Error with project:", error);
      if (error.response && error.response.status === 401) {
        handleLogout();
        setMessage("Your session has expired. Please log in again.");
      } else {
        setMessage(
          `Error ${editingProject ? "updating" : "adding"} project: ` +
            error.message
        );
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      location: project.location,
      client: project.client,
      completed: project.completed,
      size: project.size,
      images: [], // We can't pre-fill the file input
    });
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("token");
        if (isTokenExpired(token)) {
          handleLogout();
          setMessage("Your session has expired. Please log in again.");
          return;
        }
        await axios.delete(`/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Project deleted successfully!");
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
          setMessage("Your session has expired. Please log in again.");
        } else {
          setMessage("Error deleting project: " + error.message);
        }
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <h2>Admin Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.adminPanel}>
      <div className={styles.adminHeader}>
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      <h2>{editingProject ? "Edit Project" : "Add New Project"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={newProject.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          name="location"
          value={newProject.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
        <input
          name="client"
          value={newProject.client}
          onChange={handleInputChange}
          placeholder="Client"
        />
        <input
          name="completed"
          value={newProject.completed}
          onChange={handleInputChange}
          placeholder="Completed Date"
        />
        <input
          name="size"
          value={newProject.size}
          onChange={handleInputChange}
          placeholder="Size"
        />
        <input
          type="file"
          name="images"
          onChange={handleInputChange}
          accept="image/*"
          multiple
        />
        <button type="submit">
          {editingProject ? "Update Project" : "Add Project"}
        </button>
        {editingProject && (
          <button
            type="button"
            onClick={() => {
              setEditingProject(null);
              setNewProject({
                title: "",
                description: "",
                location: "",
                client: "",
                completed: "",
                size: "",
                images: [],
              });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>
      {message && <p>{message}</p>}

      <h2>Existing Projects</h2>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <div key={project._id} className={styles.projectItem}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Location: {project.location}</p>
            <p>Client: {project.client}</p>
            <p>Completed: {project.completed}</p>
            <p>Size: {project.size}</p>
            {project.images && project.images.length > 0 && (
              <img
                src={`/uploads/${project.images[0]}`}
                alt={project.title}
                className={styles.projectImage}
              />
            )}
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
