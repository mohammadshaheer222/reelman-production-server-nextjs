const CatchAsyncErrors = require("../../middlewares/CatchAsyncErrors");
const InstaDetails = require("../../models/instaDetails");
const ErrorHandler = require("../../utils/ErrorHandler");

const userInsta = CatchAsyncErrors(async (req, res, next) => {
    try {
        const insta = await InstaDetails.find({});
        res.status(200).json({ success: true, insta });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = { userInsta }