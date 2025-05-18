const CatchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const WeddingModel = require("../../models/weddingModel")
const ErrorHandler = require("../../utils/ErrorHandler.js")
const mongoose = require("mongoose")

const getWedding = CatchAsyncErrors(async (req, res, next) => {
    try {
        const wedding = await WeddingModel.find({})
        res.status(200).json({ success: true, wedding })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleCard = CatchAsyncErrors(async (req, res, next) => {
    try {
        const { id: weddingId } = req.params

        const weddingDetails = await WeddingModel.findOne({ _id: weddingId })
        if (!weddingDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, weddingDetails })
    } catch (error) {
        console.log("error")
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleWedding = CatchAsyncErrors(async (req, res, next) => {
    try {
        const categoryTitle = req.params.category;
        const categoryDoc = await mongoose.model('category').findOne({ category: categoryTitle });

        if (!categoryDoc) {
            return next(new ErrorHandler(`Category "${categoryTitle}" not found`, 404));
        }

        const weddings = await WeddingModel.find({ category: categoryDoc._id })
            .populate('category');

        if (weddings.length === 0) {
            return next(new ErrorHandler(`No weddings found for category "${categoryTitle}"`, 404));
        }
        res.status(200).json({ success: true, weddings })
    } catch (error) {
        console.log("error")
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { getWedding, getSingleWedding, getSingleCard }