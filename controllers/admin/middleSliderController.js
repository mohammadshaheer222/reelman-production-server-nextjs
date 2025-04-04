const MiddleModel = require("../../models/middleModel")

const { resizeImage } = require("../../utils/sharp")

const ErrorHandler = require("../../utils/ErrorHandler")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")

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

        if (!req.file || !req.file.filename) {
            errors.avatar = "Please provide the image field."
        }

        if (Object.keys(errors).length > 0) {
            return next(new ErrorHandler("Validation failed", 400, errors))
        }
        const fileName = req.file.path
        const resizedImage = await resizeImage(fileName)
        if (!resizedImage) {
            return next(new ErrorHandler("Error resizing the image", 500))
        }
        const middleDetails = {
            avatar: resizedImage
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
        console.log(middleId, "middle")
        const middleDetails = await MiddleModel.findOneAndDelete({ _id: middleId });

        if (!middleDetails) {
            return next(new ErrorHandler("No Images with this category", 404));
        }

        res.status(200).json({ success: true, middleDetails });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = { createMiddleController, getMiddleController, getSingleMiddleDetails, deleteMiddleDetails }