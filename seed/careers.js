const fs = require('fs');
const path = require('path');
const vm = require('vm');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Career = require('../models/Career');

const loadCareerData = () => {
  const filePath = path.join(__dirname, '../../frontend/careerData.js');
  const code = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {} };

  vm.runInNewContext(code, sandbox);

  return sandbox.window.careerData;
};

const seedCareers = async () => {
  try {
    await connectDB();

    const careerData = loadCareerData();
    const careers = Object.entries(careerData).map(([name, details]) => ({
      name,
      ...details,
    }));

    await Career.deleteMany({});
    await Career.insertMany(careers);

    console.log(`Successfully seeded ${careers.length} careers into MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedCareers();
