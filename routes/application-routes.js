import express from "express";
import Course from "../models/Course.js";
import CareerPath from "../models/Careers.js";

const applicationRouter = express.Router();

applicationRouter.get("/", async (req, res) => {
  const courses = await Course.find();
  res.render("course-list", { courses });
});

applicationRouter.get("/create-course", (req, res) => {
  res.render("form");
});

applicationRouter.post("/api/course", async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      duration,
      level,
      price,
      imageUrl,
      topics,
      avgRating,
      ratingCount,
    } = req.body;

    const course = new Course({
      title,
      description,
      instructor,
      duration,
      level,
      price: parseFloat(price),
      imageUrl,
      topics: topics.split(",").map((topic) => topic.trim()),
      ratings: {
        average: parseFloat(avgRating),
        count: parseInt(ratingCount),
      },
    });

    await course.save();
    res.render("upload-success", { course });
  } catch (error) {
    res.status(500).send("Error saving course: " + error.message);
  }
});

applicationRouter.get("/add-career", (req, res) => {
  res.render("add-career");
});

applicationRouter.post("/add-career", async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      averageSalary,
      requiredSkills,
      educationRequirements,
      jobOutlook,
      imageUrl,
    } = req.body;

    const skillsArray = requiredSkills.split(",").map((skill) => skill.trim());

    const newCareerPath = new CareerPath({
      title,
      category,
      description,
      averageSalary,
      requiredSkills: skillsArray,
      educationRequirements,
      jobOutlook,
      imageUrl,
    });

    await newCareerPath.save();
    res.redirect("/career-paths");
  } catch (err) {
    console.error(err);
    res.render("add-career", {
      error: "Error adding career path",
    });
  }
});

applicationRouter.get("/career-paths", async (req, res) => {
  try {
    const careerPaths = await CareerPath.find().sort({ createdAt: -1 });
    res.render("career-paths", {
      careerPaths,
    });
  } catch (err) {
    console.error(err);
    res.render("career-paths", {
      error: "Error retrieving career paths",
      careerPaths: [],
    });
  }
});

export default applicationRouter;
