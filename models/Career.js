const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: String, required: true },
    eligibility: { type: String, required: true },
    bestFor: { type: String, required: true },
  },
  { _id: false }
);

const salarySchema = new mongoose.Schema(
  {
    entry: { type: String, required: true },
    mid: { type: String, required: true },
    senior: { type: String, required: true },
    international: { type: String, required: true },
  },
  { _id: false }
);

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
  },
  { _id: false }
);

const governmentJobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    exam: { type: String, required: true },
  },
  { _id: false }
);

const careerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    overview: {
      type: String,
      required: true,
    },
    degrees: {
      type: [degreeSchema],
      default: [],
    },
    eligibility: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    roadmap: {
      type: [String],
      default: [],
    },
    salary: {
      type: salarySchema,
      required: true,
    },
    future: {
      type: String,
      required: true,
    },
    resources: {
      type: [resourceSchema],
      default: [],
    },
    related: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model('Career', careerSchema);

module.exports = Career;
