const HeroModel = require("../../models/heroModel")

const { resizeImage } = require("../../utils/sharp")

const ErrorHandler = require("../../utils/ErrorHandler")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")

const getHeroController = catchAsyncErrors(async (req, res, next) => {
    try {
        const hero = await HeroModel.find({})
        res.status(200).json({ success: true, hero })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { getHeroController }