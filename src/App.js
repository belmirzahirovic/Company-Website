import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar />
        <div className={styles.container}>
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Services />
                  <Projects />
                  <Contact />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
