const asyncHandler = require('express-async-handler');
const Recipes = require('../models/recipe');
const multer = require('multer');
const path = require('path');
const { create } = require('domain');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images")); // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

const getRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
});
const getRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipes.findById(req.params.id);
    return res.json(recipe);
});
const addRecipe = asyncHandler(async (req, res) => {

    // console.log('we have to add this recipe');
    const { title, instructions, time, category } = req.body;
    // console.log('we have user', req.user);
    // ingredients is an array in frontend, but with axios + JSON it's received as a string
    const ingredients = typeof req.body.ingredients === 'string'
        ? req.body.ingredients.split(",")
        : req.body.ingredients;
    // console.log(req.user);
    // ✅ Make sure file exists
    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    const coverImage = req.file.filename;
    console.log('recipe add from user', req.user);
    const newRecipe = await Recipes.create({
        title,
        instructions,
        time,
        category,
        ingredients,
        coverImage,
        createdBy: req.user.id // Assuming req.user is set by the auth middleware
    });

    return res.status(201).json(newRecipe);
});
const editRecipe = asyncHandler(async (req, res) => {
    const { title, ingredients, instructions, time, category } = req.body;
    let recipe = await Recipes.findById(req.params.id)
    const coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage;
    try {
        if (recipe) {
            await Recipes.findByIdAndUpdate(req.params.id, { ...req.body, coverImage: coverImage }, { new: true });
            return res.json({ title, ingredients, instructions, time, category });
        }
    } catch (err) {
        return res.status(404).json({ message: "Error" });
    }
});
const deleteRecipe = asyncHandler(async (req, res) => {
    try {
        await Recipes.findByIdAndDelete(req.params.id);
        return res.json({ status: "ok" });
    } catch (err) {
        return res.status(404).json({ message: "Error" })
    }
});


module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };
module.exports.upload = upload;
