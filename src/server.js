const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;  // Use environment variable or fallback to 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

