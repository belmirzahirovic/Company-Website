const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new project with image upload
router.post(
  "/",
  authenticateToken,
  upload.array("images"),
  async (req, res) => {
    try {
      const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

      const project = new Project({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        client: req.body.client,
        completed: req.body.completed,
        size: req.body.size,
        images: imageUrls,
        mainImage: 0, // Set the first image as the main image by default
      });

      const newProject = await project.save();
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// PUT (update) a project with image upload
router.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const updatedData = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        client: req.body.client,
        completed: req.body.completed,
        size: req.body.size,
      };

      if (req.file) {
        updatedData.imageUrl = `/uploads/${req.file.filename}`;
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(updatedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// DELETE a project
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
