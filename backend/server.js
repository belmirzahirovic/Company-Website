const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const projectRoutes = require("./routes/projects");
const authRoutes = require("./routes/auth");
const path = require("path");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
