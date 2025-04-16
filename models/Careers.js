import mongoose from "mongoose";
const CareerPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: String,
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  averageSalary: {
    type: Number,
    required: true,
  },
  requiredSkills: {
    type: [String],
    required: true,
  },
  educationRequirements: {
    type: String,
    required: true,
  },
  jobOutlook: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CareerPath", CareerPathSchema);
