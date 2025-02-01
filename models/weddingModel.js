const mongoose = require("mongoose")

const weddingSchema = new mongoose.Schema({
    category: {type: String, required: true},
    bride: { type: String, required: true },
    groom: { type: String, required: true },
    hero: { type: String, required: true },
    weddingAvatar: { type: [String], required: true }
}, { timestamps: true })

module.exports = mongoose.model("wedding", weddingSchema)