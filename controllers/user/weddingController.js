const CatchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const WeddingModel = require("../../models/weddingModel")
const ErrorHandler = require("../../utils/ErrorHandler.js")

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
        const { category: category } = req.params
        const weddingDetails = await WeddingModel.find({ category: category })
        if (!weddingDetails.length === 0) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, weddingDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleWedding = CatchAsyncErrors(async (req, res, next) => {
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

module.exports = { getWedding, getSingleWedding, getSingleCard }