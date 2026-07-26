const generateCareer = async (req, res) => {

    try {

        const { career } = req.body;

        if (!career) {
            return res.status(400).json({
                success: false,
                message: "Career name is required"
            });
        }

        console.log("Generate AI Career:", career);

        res.json({
            success: true,
            message: "Ready to send to n8n",
            career
        });

    }
    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    generateCareer
};