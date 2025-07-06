const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    ingredients: {
        type: Array,
        require: true
    },
    instructions: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    coverImage: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
}, { timestamps: true });


const recipeModel = mongoose.model("recipes", recipeSchema);

module.exports = recipeModel;