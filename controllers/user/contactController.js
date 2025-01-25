const CatchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler")
const sendMail = require("../../utils/sendMail")

const contactForm = CatchAsyncErrors(async (req, res, next) => {
    try {
        const formData = req.body
        let message = `
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.number}
            Message: ${formData.message}
            Location: ${formData.location}
            `
        if (formData.photography === 1) {
            message += `  Photography: Yes`
        }
        if (formData.videography === 1) {
            message += `  Videography: Yes`
        }

        if (formData.both === 1) {
            message += `  Both Photography and Videography: Yes`
        }
        await sendMail({
            subject: "Booking Details",
            message: message,
        });
        res.status(200).json({
            success: true,
            message: "Thank you for your response!!",
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500))
    }
})

module.exports = { contactForm }