const Student = require("../models/Student");
const axios = require("axios");

const startConsultation = async (req, res) => {
    try {

        const { studentId } = req.body;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        await axios.post(
            "http://localhost:5678/webhook/4398bdb6-de7b-46e6-978f-67fedeb55339",
            {
                name: student.name,
                phone: student.whatsapp,
                career: student.selectedCareer
            }
        );

        return res.json({
            success: true,
            message: "WhatsApp automation started"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = {
    startConsultation
};