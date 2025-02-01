const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    quote: { type: String, required: true },
    avatar: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("category", categorySchema)