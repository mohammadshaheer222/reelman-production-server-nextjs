const mongoose = require("mongoose")

const weddingSchema = new mongoose.Schema({
    // category: {type: String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    bride: { type: String, required: true },
    groom: { type: String, required: true },
    hero: { type: String, required: true },
    description: { type: String, required: true },
    cloudinary_id: {
        type: String,
        required: [true, "Cloudinary ID is required"],
    },
    weddingAvatar: [{
        url: String,
        cloudinary_id: String
    }],
}, { timestamps: true })

module.exports = mongoose.model("wedding", weddingSchema)