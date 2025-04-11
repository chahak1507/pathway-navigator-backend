import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  duration: String,
  level: String,
  price: Number,
  imageUrl: String,
  topics: [String],
  ratings: {
    average: Number,
    count: Number,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
