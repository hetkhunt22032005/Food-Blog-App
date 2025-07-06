import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AddFoodRecipe.css'; // Assuming you have a CSS file for styling   
const EditRecipe = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [recipeData, setRecipeData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const getData = async () => {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipe/${id}`).then((response) => {
                let res = response.data;
                // console.log('we get the prvious recipe', res);
                setRecipeData({
                    title: res.title,
                    time: res.time,
                    category: res.category,
                    ingredients: res.ingredients.join(","), // Convert array to comma-separated string
                    instructions: res.instructions,
                    coverImage: res.coverImage // Assuming coverImage is a string URL or path
                });
            }).catch((err) => {
                console.error("Error fetching recipe data:", err);
            })
        }
        getData();
    }, []);
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
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/recipe/${id}`, formData, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }); // ✅ Don't manually set headers

            // console.log('we try to send recipe');
            navigate('/myRecipe');
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    return (
        <div className="form-wrapper">
            <form className="add-recipe-form" onSubmit={onHandleSubmit}>
                <h2>Edit Recipe</h2>

                <div className="form-row">
                    <label htmlFor="title">Recipe Title</label>
                    <input type="text" onChange={onHandleChange} value={recipeData.title || ''}
                        id="title" name='title' placeholder="Enter recipe title" />
                </div>

                <div className="form-row">
                    <label htmlFor="prepTime">Preparation Time (in minutes)</label>
                    <input type="number" onChange={onHandleChange} value={recipeData.time || ''}
                        name='time' id="prepTime" placeholder="e.g. 30" />
                </div>

                <div className="form-row">
                    <label htmlFor="category">Category</label>
                    <input type="text" onChange={onHandleChange} value={recipeData.category || ''}
                        name='category' id="category" placeholder="e.g. Dessert, Main Course" />
                </div>

                <div className="form-row">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea id="ingredients" name='ingredients' value={recipeData.ingredients || ''}
                        onChange={onHandleChange} rows="4" placeholder="List ingredients here..." />
                </div>

                <div className="form-row">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea id="instructions" name='instructions' value={recipeData.instructions || ''}
                        rows="5" onChange={onHandleChange} placeholder="Write the cooking steps..." />
                </div>

                <div className="form-row">
                    <label htmlFor="image"
                    >Upload Recipe Image</label>
                    <input type="file" id="image"
                        name='coverImage' accept="image/*" onChange={handleImageChange} />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button type="submit">Edit Recipe</button>
                </div>
            </form>
        </div>
    );
}

export default EditRecipe