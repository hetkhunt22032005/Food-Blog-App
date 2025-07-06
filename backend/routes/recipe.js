const express = require("express");
const router = express.Router();
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require("../controller/recipe");
const verifyToken = require("../middleware/auth");

router.get("/", getRecipes); // get all recipes
router.get("/:id", getRecipe); // get all recipes by id
router.post("/", verifyToken, upload.single('coverImage'), addRecipe); // to add Recipe
router.put("/:id", upload.single('coverImage'), editRecipe); //Edit recipe
router.delete("/:id", deleteRecipe);// Delete Recipe



module.exports = router;