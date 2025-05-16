const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    quote: { type: String, required: true },
    avatar: { type: String, required: true },
    cloudinary_id: {
        type: String,
        required: [true, "Cloudinary ID is required"],
    },
}, { timestamps: true })

module.exports = mongoose.model("category", categorySchema)