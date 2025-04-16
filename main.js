import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import psychometricTestRouter from "./routes/psychometricTestRoutes.js";
import cors from "cors";
import Course from "./models/Course.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import applicationRouter from "./routes/application-routes.js";
import CareerPath from "./models/Careers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "pathway-navigation",
  })
  .then(() => console.log("Connected to MongoDB Cloud Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("", applicationRouter);
app.use("/api", userRouter);
app.use("/api", psychometricTestRouter);

app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/career-paths/:id", async (req, res) => {
  try {
    const careerPath = await CareerPath.findById(req.params.id);

    if (!careerPath) {
      return res.status(404).json({
        success: false,
        message: "Career path not found",
      });
    }

    res.json(careerPath);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
