const express = require("express");
const { generateCareer } = require("../controllers/aiCareerController");

const router = express.Router();

router.post("/generate", generateCareer);

module.exports = router;