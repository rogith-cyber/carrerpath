const express = require('express');

const {
  getAllCareers,
  searchCareers,
  getCareerByName,
  openCareer,
  generateCareer
} = require('../controllers/careerController');


const router = express.Router();


router.post('/open', openCareer);
router.post('/generate', generateCareer);


// Get all careers

router.get('/', getAllCareers);

// Search careers
router.get('/search', searchCareers);


// Get career by name
router.get('/:name', getCareerByName);

module.exports = router;