const Student = require('../models/Student');

const createStudent = async (req, res) => {
  try {
    const { name, email, phone, state, district, selectedCareer } = req.body;

    if (!name || !email || !phone || !state || !district || !selectedCareer) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, phone, state, district, and selectedCareer',
      });
    }

    const student = await Student.create({
      name,
      email,
      phone,
      state,
      district,
      selectedCareer,
    });

    res.status(201).json({
      success: true,
      message: 'Student saved successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save student',
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
};
