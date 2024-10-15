const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const createAdmin = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    const admin = new Admin({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin account created successfully");
    process.exit();
  } catch (error) {
    console.error("Error creating admin account:", error);
    process.exit(1);
  }
};

createAdmin();
