const FaqModel = require("../../models/faqModel")

const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler.js")

const getFaq = catchAsyncErrors(async (req, res, next) => {
    try {
        const faq = await FaqModel.find({})
        res.status(200).json({ success: true, faq })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const createFaq = catchAsyncErrors(async (req, res, next) => {
    try {
        const errors = {}
        const { title, description } = req.body
        if (!title) {
            errors.title = "Please provide the title field."
        }

        if (!description) {
            errors.description = "Please provide the description field."
        }

        if (Object.keys(errors).length > 0) {
            return next(new ErrorHandler("Validation failed", 400, errors))
        }
        const faqDetails = {
            title,
            description
        }
        const createFaq = await FaqModel.create(faqDetails)
        if (!createFaq) {
            return next(new ErrorHandler("Details are not created to database", 400))
        }
        res.status(201).json({ success: true, createFaq })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleFaq = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: faqId } = req.params
        const faqDetails = await FaqModel.findOne({ _id: faqId })
        if (!faqDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, faqDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { createFaq, getSingleFaq, getFaq }