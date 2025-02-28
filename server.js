import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import mongoose from "mongoose";
dotenv.config(); // Load environment variables
import cors from "cors";

const app = express();


app.use(
    cors({
      origin: "http://localhost:5173", // Your React frontend URL
      credentials: true, // Allow cookies and sessions
    })
  );
  
app.use(
  session({
    secret: process.env.SESSION_SECRET || "some_secret_key", // 🔑 Secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// 🔑 Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Serialize & Deserialize User
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// 🔗 Google Login Route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔄 Google Callback Route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard", // Redirect after successful login
  })
);

// 📌 Protected Dashboard Route
app.get("/dashboard", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/google"); // Redirect to login if not authenticated
  }
  res.send(
    `<h1>Welcome, ${req.user.displayName}!</h1><p>Email: ${req.user.emails[0].value}</p>`
  );
});

// 👤 Logout Route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.send("Server is running! Try logging in at /auth/google");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));