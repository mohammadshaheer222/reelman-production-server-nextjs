const CatchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler")
const sendMail = require("../../utils/sendMail")

const contactForm = CatchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, number, category, location, eventDate } = req.body
        // let extendedMessage = message;
        // if (photography === 1) extendedMessage += `  Photography: Yes`;
        // if (videography === 1) extendedMessage += `  Videography: Yes`;
        // if (both === 1) extendedMessage += `  Both Photography and Videography: Yes`;

        const formData = `
      Name: ${name}
      Email: ${email}
      Phone: ${number}
      Type: ${category}
      Location: ${location}
      Event Date: ${eventDate}
    `;

        await sendMail({ subject: "Booking Details", message: formData });

        res.status(200).json({
            success: true,
            message: "Thank you for your response!",
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500))
    }
})

module.exports = { contactForm }