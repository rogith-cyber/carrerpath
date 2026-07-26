const express = require("express");
const router = express.Router();

const { startConsultation } = require("../controllers/whatsappController");

router.post("/start", startConsultation);

module.exports = router;