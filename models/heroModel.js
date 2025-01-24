const mongoose = require("mongoose")

const heroSchema = new mongoose.Schema({
    avatar: {type: String, required: true }
},{ timestamps: true })

module.exports = mongoose.model("hero", heroSchema)