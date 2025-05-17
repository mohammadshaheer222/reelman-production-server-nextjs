const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const { resizeImage } = require("../../utils/sharp.js")
const WeddingModel = require("../../models/weddingModel")
const ErrorHandler = require("../../utils/ErrorHandler.js")
const mongoose = require("mongoose")
const { deleteImageFromCloudinary } = require("../../utils/cloudinary-delete.js")

const getWedding = catchAsyncErrors(async (req, res, next) => {
    try {
        const wedding = await WeddingModel.find({}).populate('category');
        res.status(200).json({ success: true, wedding })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const createWedding = catchAsyncErrors(async (req, res, next) => {
    const errors = {};
    const { category, groom, bride, description } = req.body;

    if (!category) errors.category = "category is required";
    if (!groom) errors.groom = "Groom's name is required";
    if (!bride) errors.bride = "Bride's name is required";
    if (!description) errors.description = "Description is required";
    if (!req.files['hero']) errors.hero = "Hero image is required";
    if (!req.files['wedding-avatar']) errors.avatar = "At least one wedding photo is required";

    if (Object.keys(errors).length > 0) {
        return next(new ErrorHandler("Validation failed", 400, errors));
    }

    try {

        // const categoryExists = await mongoose.model('category').findById(category);
        // if (!categoryExists) {
        //     return next(new ErrorHandler("Category not found", 404));
        // }

        const existingCount = await WeddingModel.countDocuments();
        const newPhotosCount = req.files['wedding-avatar'].length + 1; // +1 for hero image
        if (existingCount + newPhotosCount > 10) {
            return next(new ErrorHandler("Maximum limit of 10 photos reached", 400));
        }

        const heroFile = req.files['hero'][0];

        const weddingAvatars = [];
        if (req.files['wedding-avatar']) {
            for (const file of req.files['wedding-avatar']) {
                weddingAvatars.push({
                    url: file.path,
                    cloudinary_id: file.filename
                })
            }
        }

        const wedding = await WeddingModel.create({
            hero: heroFile.path,
            cloudinary_id: heroFile.filename,
            category,
            groom,
            bride,
            description,
            weddingAvatar: weddingAvatars
        });

        res.status(201).json({
            success: true,
            wedding
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

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

const deleteWedding = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: weddingId } = req.params;
        const wedding = await WeddingModel.findOneAndDelete({ _id: weddingId });
        console.log(wedding, "wedding")
        if (!wedding) {
            return next(new ErrorHandler("No Images with this id", 400));
        }
        if (wedding.cloudinary_id) {
            await deleteImageFromCloudinary(wedding.cloudinary_id);
        }
        if (wedding.weddingAvatar && wedding.weddingAvatar.length > 0) {
            await Promise.all(
                wedding.weddingAvatar.map(async (avatar) => {
                    console.log(avatar, "avatar")
                    if (avatar.cloudinary_id) {
                        await deleteImageFromCloudinary(avatar.cloudinary_id);
                    }
                })
            );
        }
        res.status(200).json({ success: true, wedding });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { createWedding, getWedding, getSingleWedding, deleteWedding }