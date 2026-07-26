const Career = require('../models/Career');
const careerSuggestions = require('../data/careerSuggestions');
const axios = require("axios");

// ===============================
// GET ALL CAREERS
// ===============================
const getAllCareers = async (req, res) => {

  console.log("=== generateCareer route called ===");
  
  try {

    const careers = await Career.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch careers",
      error: error.message,
    });

  }
};

// ===============================
// SEARCH CAREERS
// ===============================
const searchCareers = async (req, res) => {
  try {

    const query = req.query.q;

    if (!query) {

      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });

    }

    const careers = await Career.find({
      name: {
        $regex: query,
        $options: "i",
      }
    }).limit(20);

    const suggestionResults = careerSuggestions
      .filter(career =>
        career.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10);

    res.status(200).json({
      success: true,
      count: careers.length,
      found: careers.length > 0,
      data: careers,
      suggestions: suggestionResults,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });

  }
};

// ===============================
// OPEN CAREER
// ===============================
const openCareer = async (req, res) => {

  try {

    const { career } = req.body;

    if (!career) {
      return res.status(400).json({
        success: false,
        message: "Career is required"
      });
    }

    const existingCareer = await Career.findOne({
      name: career
    });

    if (existingCareer) {

      return res.status(200).json({
        success: true,
        exists: true,
        data: existingCareer
      });

    }

    return res.status(200).json({
      success: true,
      exists: false,
      message: "Career not found. Generate with AI."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ===============================
// GET CAREER BY NAME
// ===============================
const getCareerByName = async (req, res) => {

  try {

    const careerName = decodeURIComponent(req.params.name);

    const career = await Career.findOne({
      name: careerName,
    });

    if (!career) {

      return res.status(404).json({
        success: false,
        message: `Career "${careerName}" not found`,
      });

    }

    res.status(200).json({
      success: true,
      data: career,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch career",
      error: error.message,
    });

  }

};

// ===============================
// GENERATE AI CAREER
// ===============================
const generateCareer = async (req, res) => {

    try {

        const { career } = req.body;

        if (!career) {
            return res.status(400).json({
                success: false,
                message: "Career is required"
            });
        }

        // Already exists?
        const existingCareer = await Career.findOne({ name: career });

        if (existingCareer) {
            return res.status(200).json({
                success: true,
                data: existingCareer
            });
        }

        // Call n8n

        console.log("Calling n8n...");


        console.log("Calling n8n...");

const aiResponse = await axios.post(
    "http://localhost:5678/webhook/7122ba54-4ffb-4274-ba95-d82eb6dd4153",
    {
        career
    }
);

console.log("Returned from n8n");

const aiCareer = aiResponse.data;

console.log("Saving Mongo...");

// Save to MongoDB
const savedCareer = await Career.create(aiCareer);

console.log("Saved!");

        return res.status(200).json({
            success: true,
            data: savedCareer
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
  getAllCareers,
  searchCareers,
  openCareer,
  generateCareer,
  getCareerByName,
  
};