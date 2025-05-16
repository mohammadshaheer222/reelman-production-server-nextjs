const HeroModel = require("../../models/heroModel")

const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler.js")
const { deleteImageFromCloudinary } = require("../../utils/cloudinary-delete.js")

const getHeroController = catchAsyncErrors(async (req, res, next) => {
    try {
        const hero = await HeroModel.find({})
        res.status(200).json({ success: true, hero })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const createHeroController = catchAsyncErrors(async (req, res, next) => {
    try {
        const errors = {}

        if (!req.file || !req.file.path) {
            errors.avatar = "Please provide the image field."
        }

        if (Object.keys(errors).length > 0) {
            return next(new ErrorHandler("Validation failed", 400, errors))
        }

        const heroResult = await cloudinary.uploader.upload(heroImage.path, {
            folder: 'home/hero',
            transformation: { width: 1200, height: 800, crop: 'fill' }
        });

        const heroDetails = {
            avatar: req.file.path,
            cloudinary_id: req.file.filename
        };

        const createHero = await HeroModel.create(heroDetails)
        if (!createHero) {
            return next(new ErrorHandler("Details are not created to database", 400))
        }
        res.status(201).json({ success: true, createHero })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleHeroDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: heroId } = req.params
        const heroDetails = await HeroModel.findOne({ _id: heroId })
        if (!heroDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, heroDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const deleteHeroDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: heroId } = req.params;
        const heroDetails = await HeroModel.findOneAndDelete({ _id: heroId });

        if (!heroDetails) {
            return next(new ErrorHandler("No Images with this category", 404));
        }

        if (heroDetails.cloudinary_id) {
            await deleteImageFromCloudinary(heroDetails.cloudinary_id);
        }

        res.status(200).json({ success: true, heroDetails });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = { createHeroController, getHeroController, getSingleHeroDetails, deleteHeroDetails }