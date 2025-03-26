import express from "express";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.post("/user", async (req, res) => {
  try {
    const { name, email, picture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
        userId: existingUser._id,
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      picture: picture || null,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

export default userRouter;
