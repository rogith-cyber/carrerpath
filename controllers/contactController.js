const Contact = require('../models/Contact');

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Message received successfully',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save contact message',
      error: error.message,
    });
  }
};

module.exports = {
  createContact,
};
