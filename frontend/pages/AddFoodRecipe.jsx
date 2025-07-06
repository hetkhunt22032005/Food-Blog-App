import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddFoodRecipe.css';
const AddRecipeForm = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [recipeData, setRecipeData] = useState([]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
        // console.log(file);
        setRecipeData(pre => ({ ...pre, [e.target.name]: file }));
    };
    const onHandleChange = (e) => {
        let val = (e.target.name == "ingredients") ? e.target.value.split(",") : e.target.value;
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }));
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault();
        // console.log(recipeData);
        //convert  into formData
        const formData = new FormData();
        for (const key in recipeData) {
            if (key === "ingredients") {
                formData.append(key, JSON.stringify(recipeData[key])); // convert array to JSON string
            } else {
                formData.append(key, recipeData[key]);
            }
        }

        try {
            const token = sessionStorage.getItem("token");
            // for (let pair of formData.entries()) {
            //     console.log(`${pair[0]}: ${pair[1]}`);
            // }
            await axios.post("http://localhost:5000/recipe", formData, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }); // ✅ Don't manually set headers

            // console.log('we try to send recipe');
            navigate('/');
        } catch (err) {
            console.error("Upload failed", err);
        }
    };
    return (
        <div className="form-wrapper">
            <form className="add-recipe-form" onSubmit={onHandleSubmit}>
                <h2>Add New Recipe</h2>

                <div className="form-row">
                    <label htmlFor="title">Recipe Title</label>
                    <input type="text" onChange={onHandleChange} id="title" name='title' placeholder="Enter recipe title" />
                </div>

                <div className="form-row">
                    <label htmlFor="prepTime">Preparation Time (in minutes)</label>
                    <input type="number" onChange={onHandleChange} name='time' id="prepTime" placeholder="e.g. 30" />
                </div>

                <div className="form-row">
                    <label htmlFor="category">Category</label>
                    <input type="text" onChange={onHandleChange} name='category' id="category" placeholder="e.g. Dessert, Main Course" />
                </div>

                <div className="form-row">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea id="ingredients" name='ingredients' onChange={onHandleChange} rows="4" placeholder="List ingredients here..." />
                </div>

                <div className="form-row">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea id="instructions" name='instructions' rows="5" onChange={onHandleChange} placeholder="Write the cooking steps..." />
                </div>

                <div className="form-row">
                    <label htmlFor="image">Upload Recipe Image</label>
                    <input type="file" id="image" name='coverImage' accept="image/*" onChange={handleImageChange} />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button type="submit">Add Recipe</button>
                </div>
            </form>
        </div>
    );
};

export default AddRecipeForm;
