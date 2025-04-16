import express from "express";
import PsychometricTest from "../models/PsychometricTest.js";
import User from "../models/User.js";

const psychometricTestRouter = express.Router();

psychometricTestRouter.get("/abcd", async (req, res) => {
  res.json({ message: "success" });
});

psychometricTestRouter.post("/test", async (req, res) => {
  try {
    const { email, resultText } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        message: "User with this email does not exist",
      });
    }

    const newTest = new PsychometricTest({
      email,
      resultText,
    });

    await newTest.save();
    console.log(newTest);

    res.status(201).json({
      message: "Psychometric test created successfully",
      test: {
        id: newTest._id,
        email: newTest.email,
        resultText: newTest.resultText,
      },
    });
  } catch (error) {
    console.error("Error creating psychometric test:", error);
    res.status(500).json({
      message: "Error creating psychometric test",
      error: error.message,
    });
  }
});

// Get all psychometric tests for an email
psychometricTestRouter.get("/test/:email", async (req, res) => {
  try {
    const test = await PsychometricTest.findOne(
      { email: req.params.email },
      "email resultText createdAt"
    ).sort({ createdAt: -1 }); // Sort by most recent first

    if (!test) {
      return res.status(404).json({
        message: "No psychometric tests found for this email",
      });
    }

    res.json(test);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching psychometric tests",
      error: error.message,
    });
  }
});

export default psychometricTestRouter;
