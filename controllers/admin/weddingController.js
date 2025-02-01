const ErrorHandler = require("../../utils/ErrorHandler")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const { resizeImage } = require("../../utils/sharp")
const WeddingModel = require("../../models/weddingModel")

const getWedding = catchAsyncErrors(async (req, res, next) => {
    try {
        const wedding = await WeddingModel.find({})
        res.status(200).json({ success: true, wedding })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const createWedding = catchAsyncErrors(async (req, res, next) => {
    try {
        const errors = {}
        const { category, groom, bride, description } = req.body

        if (!category) errors.groom = "Please provide the category field."
        if (!groom) errors.groom = "Please provide the groom field."
        if (!bride) errors.bride = "Please provide the bride field."
        if (!description) errors.description = "Please provide the description field."
        if (!req.files["hero"] || !req.files.length === 0) errors.avatar = "Please provide the hero field."
        if (Object.keys(errors).length > 0) return next(new ErrorHandler("Validation failed", 400, errors))

        const dbPhotosCount = await WeddingModel.countDocuments()
        const totalUploadedFiles = dbPhotosCount + req.files.length

        if (totalUploadedFiles > 8) return next(new ErrorHandler("You can upload a maximum of 10 photos ,Delete photos in your list", 400))

        const heroPath = req.files["hero"][0].path

        const resizedHeroImage = await resizeImage(heroPath)
        if (!resizedHeroImage) return next(new ErrorHandler("Error resizing the hero image", 500))

        const weddingAvatar = []
        for (const file of req.files["wedding-avatar"]) {
            const weddingAvatarPath = file.path
            const resizedWeddingAvatar = await resizeImage(weddingAvatarPath)
            if (!resizedWeddingAvatar) return next(new ErrorHandler("Error resizing a wedding avatar image", 500))
            weddingAvatar.push(resizedWeddingAvatar)
        }

        const weddingDetails = {
            hero: resizedHeroImage,
            category,
            groom,
            bride,
            description,
            weddingAvatar
        }

        const createWedding = await WeddingModel.create(weddingDetails)
        if (!createWedding) return next(new ErrorHandler("Details are not created to database", 400))
        res.status(201).json({ success: true, createWedding })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleWedding = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: weddingId } = req.params
        const weddingDetails = await WeddingModel.findOne({ _id: weddingId })
        if (!weddingDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, weddingDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { createWedding, getWedding, getSingleWedding }