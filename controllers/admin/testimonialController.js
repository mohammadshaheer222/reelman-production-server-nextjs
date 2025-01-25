const ErrorHandler = require("../../utils/ErrorHandler")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const { resizeImage } = require("../../utils/sharp")
const TestimonialModel = require("../../models/testimonialModel")

const getTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const testimonial = await TestimonialModel.find({});
        res.status(200).json({ success: true, testimonial });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

const createTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const errors = {};
        const { client, message } = req.body
        if (!client) {
            errors.link = "Please provide the client field.";
        }

        if (!message) {
            errors.link = "Please provide the message field.";
        }

        if (Object.keys(errors).length > 0) {
            return next(new ErrorHandler("Validation failed", 400, errors));
        }
        let resizedImage = "";
        if (req.file) {
            const fileName = req.file.path;
            resizedImage = await resizeImage(fileName);
            if (!resizedImage) {
                return next(new ErrorHandler("Error resizing the image", 500));
            }
        }
        const testimonialDetails = {
            client,
            message,
            avatar: resizedImage
        }
        const createTestimonial = await TestimonialModel.create(testimonialDetails)
        if (!createTestimonial) {
            return next(new ErrorHandler("Details are not created to database", 400))
        }
        res.status(201).json({ success: true, createTestimonial })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: testimonialId } = req.params;
        const testimonialDetails = await TestimonialModel.findOne({ _id: testimonialId })
        if (!testimonialDetails) {
            return next(new ErrorHandler("No details with this id", 400));
        }
        res.status(200).json({ success: true, testimonialDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { createTestimonial, getTestimonial, getSingleTestimonial }