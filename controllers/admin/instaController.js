const InstaDetails = require("../../models/instaDetails")

const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler.js")
const { deleteImageFromCloudinary } = require("../../utils/cloudinary-delete.js")

const getInsta = catchAsyncErrors(async(req, res, next) => {
    try {
        const insta = await InstaDetails.find({})
        res.status(200).json({ success: true, insta })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const createInstaController = catchAsyncErrors(async(req, res, next) => {
    try {
        const errors = {}
        const { link } = req.body

        const totalPhotos = await InstaDetails.countDocuments()
        if (totalPhotos >= 8) {
            errors.avatar = "Maximum limit reached. You can only add up to 8 photos. Please delete some photos to add new ones."
        }

        if (!req.body.link) {
            errors.link = "Please provide the link field."
        }

        if (!req.file || !req.file.path) {
            errors.avatar = "Please provide the image field."
        }

        if (Object.keys(errors).length > 0) {
            return next(new ErrorHandler("Validation failed", 400, errors))
        }

        const instaDetails = {
            link,
            avatar: req.file.path,
            cloudinary_id: req.file.filename
        }

        const createInsta = await InstaDetails.create(instaDetails)

        if(!createInsta) {
            return next(new ErrorHandler("Details are not created to database", 400))
        }
        res.status(201).json({ success: true, createInsta})
    } catch(error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleInstaDetails = catchAsyncErrors(async (req, res, next) =>{
    try {
        const {id: instaId } = req.params
        const instaDetails = await InstaDetails.findOne({ _id: instaId })

        if (!instaDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }

        res.status(200).json({ success: true, instaDetails})
    } catch(error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const deleteInstaDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: instaId } = req.params;
        const instaAvatar = await InstaDetails.findOneAndDelete({ _id: instaId });

        if (!instaAvatar) {
            return next(new ErrorHandler("No Images with this category", 404));
        }

        if (instaAvatar.cloudinary_id) {
            await deleteImageFromCloudinary(instaAvatar.cloudinary_id);
        }

        res.status(200).json({ success: true, instaAvatar });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = { createInstaController, getInsta, getSingleInstaDetails, deleteInstaDetails }