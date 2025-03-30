const TestimonialModel = require("../../models/testimonialModel")

const { resizeImage } = require("../../utils/sharp")

const ErrorHandler = require("../../utils/ErrorHandler")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")

const getTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const testimonial = await TestimonialModel.find({})
        res.status(200).json({ success: true, testimonial })
        console.log(testimonial, "tesy")
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const createTestimonial = catchAsyncErrors(async (req, res, next) => {
    try {
        const errors = {}
        console.log("start")

        const { client, message, place } = req.body

        console.log(req.body, "st")

        const totalTestimonialData = await TestimonialModel.countDocuments()
        if (totalTestimonialData >= 6) {
            errors.limit = "Maximum limit reached. You can only add up to 6 Reviews. Please delete some reviews to add new ones."
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

        console.log("Request received for creating testimonial");
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);

        const imageUrl = req.file.path || req.file.secure_url;

        // let resizedImage = ""
        // if (req.file) {
        //     const fileName = req.file.path
        //     resizedImage = await resizeImage(fileName)
        //     if (!resizedImage) {
        //         return next(new ErrorHandler("Error resizing the image", 500))
        //     }
        // }

        const testimonialDetails = {
            client,
            message,
            place,
            avatar: imageUrl
        }

        const createTestimonial = await TestimonialModel.create(testimonialDetails)


        if (!createTestimonial) {
            return next(new ErrorHandler("Details are not created to database", 400))
        }

        console.log("Testimonial created:", createTestimonial);
        console.log("Image URL saved:", imageUrl);

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

        res.status(200).json({ success: true, testimonialDetails });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = { createTestimonial, getTestimonial, getSingleTestimonial, deletestTestimonial }