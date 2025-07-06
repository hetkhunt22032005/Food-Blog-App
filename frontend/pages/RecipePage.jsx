// 



import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RecipePage.css"; // Link to the CSS below

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipe/${id}`);
                setRecipe(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, []);

    if (loading) return <div className="loader">Loading…</div>;
    // if (!recipe)
    //     return (
    //         <div className="error-page">
    //             <h2>Recipe Not Found</h2>
    //             <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
    //         </div>
    //     );

    return (
        <main className="recipe-page">
            <button className="back-btn top" onClick={() => navigate(-1)}>← Back</button>
            <section className="recipe-header">
                <img src={`${import.meta.env.VITE_API_BASE_URL}/images/${recipe.coverImage}`} alt={recipe.title} className="recipe-img" />
                <div className="recipe-info">
                    <h1 className="recipe-title">{recipe.title}</h1>
                    <p className="recipe-meta">
                        <span className="badge">{recipe.category}</span>
                        <span>🕒 {recipe.time}</span>
                    </p>
                </div>
            </section>
            <section className="recipe-content">
                <div className="ingredients">
                    <h2>Ingredients</h2>
                    <ul>{recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
                </div>
                <div className="instructions">
                    <h2>Instructions</h2>
                    <p>{recipe.instructions}</p>
                </div>
            </section>
        </main>
    );
};

export default RecipePage;
