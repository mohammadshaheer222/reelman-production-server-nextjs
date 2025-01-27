const ErrorHandler = require("../../utils/ErrorHandler")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const { resizeImage } = require("../../utils/sharp")
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
        const { category, quote, groom, bride, description } = req.body

        if (!category) errors.category = "Please provide the category field."
        if (!quote) errors.quote = "Please provide the quote field."
        if (!groom) errors.groom = "Please provide the groom field."
        if (!bride) errors.bride = "Please provide the bride field."
        if (!description) errors.description = "Please provide the description field."
        if (!req.files["avatar"] || !req.files.length === 0) errors.avatar = "Please provide the image field."
        if (!req.files["hero"] || !req.files.length === 0) errors.avatar = "Please provide the hero field."
        if (Object.keys(errors).length > 0) return next(new ErrorHandler("Validation failed", 400, errors))

        const avatarPath = req.files["avatar"][0].path;
        const heroPath = req.files["hero"][0].path;

        const resizedAvatarImage = await resizeImage(avatarPath);
        if (!resizedAvatarImage) return next(new ErrorHandler("Error resizing the avatar image", 500))

        const resizedHeroImage = await resizeImage(heroPath);
        if (!resizedHeroImage) return next(new ErrorHandler("Error resizing the hero image", 500))

        const categoryDetails = {
            category,
            quote,
            avatar: resizedAvatarImage,
            hero: resizedHeroImage,
            groom,
            bride,
            description
        }
        const createCategory = await CategoryModel.create(categoryDetails)
        if (!createCategory) return next(new ErrorHandler("Details are not created to database", 400))
        res.status(201).json({ success: true, createCategory })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: categoryId } = req.params;
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