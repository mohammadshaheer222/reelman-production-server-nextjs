const MiddleModel = require("../../models/middleModel")

const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler.js")
const { deleteImageFromCloudinary } = require("../../utils/cloudinary-delete.js")

const getMiddleController = catchAsyncErrors(async (req, res, next) => {
    try {
        const middle = await MiddleModel.find({})
        res.status(200).json({ success: true, middle })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const createMiddleController = catchAsyncErrors(async (req, res, next) => {
    try {
        const errors = {}

        if (!req.file || !req.file.path) {
            errors.avatar = "Please provide the image field."
        }

        if (Object.keys(errors).length > 0) {
            return next(new ErrorHandler("Validation failed", 400, errors))
        }

        const middleDetails = {
            avatar: req.file.path,
            cloudinary_id: req.file.filename
        }
        const createMiddle = await MiddleModel.create(middleDetails)
        if (!createMiddle) {
            return next(new ErrorHandler("Details are not created to database", 400))
        }
        res.status(201).json({ success: true, createMiddle })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleMiddleDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: middleId } = req.params
        const middleDetails = await MiddleModel.findOne({ _id: middleId })
        if (!middleDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, middleDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const deleteMiddleDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: middleId } = req.params;
        const middleDetails = await MiddleModel.findOneAndDelete({ _id: middleId });

        if (!middleDetails) {
            return next(new ErrorHandler("No Images with this category", 404));
        }

        if(middleDetails.cloudinary_id) {
            await deleteImageFromCloudinary(middleDetails.cloudinary_id)
        }

        res.status(200).json({ success: true, middleDetails });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = { createMiddleController, getMiddleController, getSingleMiddleDetails, deleteMiddleDetails }