import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your React frontend URL
    credentials: true, // Allow cookies and sessions
  })
);

app.use(express.json()); // Middleware to parse JSON requests

// 📌 Example Protected Route (For Firebase Auth)
app.get("/dashboard", (req, res) => {
  res.send("Welcome to the dashboard! You need Firebase Auth to access this.");
});

// 👤 Logout Route (Client-side should handle Firebase logout)
app.get("/logout", (req, res) => {
  res.send("You have been logged out!");
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
