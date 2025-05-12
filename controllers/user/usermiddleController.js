const MiddleModel = require("../../models/middleModel")

const ErrorHandler = require("../../utils/ErrorHandler.js")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")

const getMiddleController = catchAsyncErrors(async (req, res, next) => {
    try {
        const middle = await MiddleModel.find({})
        res.status(200).json({ success: true, middle })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { getMiddleController }