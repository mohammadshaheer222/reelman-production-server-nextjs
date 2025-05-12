const TestimonialModel = require("../../models/testimonialModel")

const ErrorHandler = require("../../utils/ErrorHandler.js")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")

const getTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const testimonial = await TestimonialModel.find({})
        res.status(200).json({ success: true, testimonial })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { getTestimonial }