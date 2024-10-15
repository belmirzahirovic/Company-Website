const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const deleteAdmin = async () => {
  try {
    const result = await Admin.deleteMany({});
    console.log(`Deleted ${result.deletedCount} admin account(s)`);
    process.exit();
  } catch (error) {
    console.error("Error deleting admin account(s):", error);
    process.exit(1);
  }
};

deleteAdmin();
