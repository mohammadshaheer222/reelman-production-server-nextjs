const mongoose = require("mongoose")

const middleSchema = new mongoose.Schema({
    avatar: {type: String, required: true }
},{ timestamps: true })

module.exports = mongoose.model("middle", middleSchema)