const sendMail = require("../../utils/sendMail")

const CatchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler")

const contactForm = CatchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, number, category, location, eventDate } = req.body

        const formData = `
      Name: ${name}
      Email: ${email}
      Phone: ${number}
      Type: ${category}
      Location: ${location}
      Event Date: ${eventDate}
    `

        await sendMail({ subject: "Booking Details", message: formData })

        res.status(200).json({
            success: true,
            message: "Thank you for your response!",
        })
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500))
    }
})

module.exports = { contactForm }