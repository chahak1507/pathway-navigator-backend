import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import psychometricTestRouter from "./routes/psychometricTestRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "pathway-navigation",
  })
  .then(() => console.log("Connected to MongoDB Cloud Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api", userRouter);
app.use("/api", psychometricTestRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
