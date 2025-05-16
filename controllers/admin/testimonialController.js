const TestimonialModel = require("../../models/testimonialModel")

const { resizeImage } = require("../../utils/sharp.js")

const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler.js")
const { deleteImageFromCloudinary } = require("../../utils/cloudinary-delete.js")

const getTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const testimonial = await TestimonialModel.find({})
        res.status(200).json({ success: true, testimonial })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const createTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const errors = {}
        const { client, message, place } = req.body

        const totalTestimonialData = await TestimonialModel.countDocuments()
        if (totalTestimonialData >= 6) {
            errors.avatar = "Maximum limit reached. You can only add up to 6 Reviews. Please delete some reviews to add new ones."
        }

        if (!client) {
            errors.client = "Please provide the client field."
        }

        if (!message) {
            errors.message = "Please provide the message field."
        }

        if (!place) {
            errors.place = "Please provide the place field."
        }

        if (Object.keys(errors).length > 0) {
            return next(new ErrorHandler("Validation failed", 400, errors))
        }

        const testimonialDetails = {
            client,
            message,
            place,
            avatar: req.file.path,
            cloudinary_id: req.file.filename,
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
        const { id: testimonialId } = req.params
        const testimonialDetails = await TestimonialModel.findOne({ _id: testimonialId })
        if (!testimonialDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, testimonialDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const deletestTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: testimonialId } = req.params;
        const testimonialDetails = await TestimonialModel.findOneAndDelete({ _id: testimonialId });

        if (!testimonialDetails) {
            return next(new ErrorHandler("No data with this category", 404));
        }

        if(testimonialDetails.cloudinary_id) {
            await deleteImageFromCloudinary(testimonialDetails.cloudinary_id)
        }

        res.status(200).json({ success: true, testimonialDetails });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = { createTestimonial, getTestimonial, getSingleTestimonial, deletestTestimonial }