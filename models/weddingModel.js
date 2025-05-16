const mongoose = require("mongoose")

const weddingSchema = new mongoose.Schema({
    category: {type: String, required: true},
    bride: { type: String, required: true },
    groom: { type: String, required: true },
    hero: {
        url: String,
        public_id: String
    },
    weddingAvatar: [{
        url: String,
        public_id: String
    }],
}, { timestamps: true })

module.exports = mongoose.model("wedding", weddingSchema)