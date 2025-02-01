const ErrorHandler = require("../../utils/ErrorHandler")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const { resizeImage } = require("../../utils/sharp")
const fs = require("fs")
const CategoryModel = require("../../models/categoryModel")

const getCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        const category = await CategoryModel.find({});
        res.status(200).json({ success: true, category });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

const createCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        const errors = {};
        const { category, quote } = req.body
        if (!category ) errors.link = "Please provide the category field."
        if (!quote) errors.link = "Please provide the category field."

        if (!req.file || !req.file.filename) errors.avatar = "Please provide the image field."
        
        if (Object.keys(errors).length > 0) return next(new ErrorHandler("Validation failed", 400, errors))

        const fileName = req.file.path
        const resizedImage = await resizeImage(fileName)
        if (!resizedImage) {
            return next(new ErrorHandler("Error resizing the image", 500))
        }
        const categoryDetails = {
            category,
            quote,
            avatar: resizedImage
        }
        const createCategory = await CategoryModel.create(categoryDetails)
        if (!createCategory) {
            return next(new ErrorHandler("Details are not created to database", 400))
        }
        res.status(201).json({ success: true, createCategory })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: categoryId } = req.params
        const categoryDetails = await CategoryModel.findOne({ _id: categoryId })
        if (!categoryDetails) {
            return next(new ErrorHandler("No details with this id", 400));
        }
        res.status(200).json({ success: true, categoryDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { createCategory, getCategory, getSingleCategory }