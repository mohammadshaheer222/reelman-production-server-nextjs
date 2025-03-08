const mongoose = require("mongoose")

const testimonialSchema = new mongoose.Schema({
    client: { type: String, required: true },
    message: { type: String, required: true },
    place: { type: String, required: true },
    avatar: { type: String, required: false }
}, { timestamps: true })

module.exports = mongoose.model("testimonials", testimonialSchema)