// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import InputForm from '../components/InputForm';
// import Model from '../components/Model';
// import RecipeItems from '../components/RecipeItems';
// import foodRecipe from '../src/assets/pic3.jpg';

// const Home = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));

//     const [recipes, setRecipes] = useState([]);
//     const [filteredRecipes, setFilteredRecipes] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);

//     const addRecipe = () => {
//         if (token)
//             navigate('addFoodRecipe');
//         else
//             setIsOpen(true);
//     };

//     // 🔄 Fetch all recipes from backend
//     useEffect(() => {
//         const fetchRecipes = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/recipe');
//                 setRecipes(res.data);
//                 if (location.pathname === "/myRecipe") {
//                     const userRecipes = res.data.filter(recipe => recipe.createdBy === user._id);
//                     setFilteredRecipes(userRecipes);
//                 }
//             } catch (err) {
//                 console.error('Error fetching recipes:', err);
//             }
//         };
//         fetchRecipes();
//     }, [location.pathname]);
//     return (
//         <>
//             <section className='home'>
//                 <div className="left">
//                     <h1>Food Recipe</h1>
//                     <h5>
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                     </h5>
//                     <button onClick={addRecipe}>Share your recipe</button>
//                 </div>
//                 <div className="right">
//                     <img src={foodRecipe} width="320px" height="300px" alt="Recipe Visual" />
//                 </div>
//             </section>

//             <div className="bg">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
//                     <path fill="#d4f6e8" fillOpacity="1" d="M0,32L48,58.7C96,85,192,139,288,165.3C384,192,480,192,576,176C672,160,768,128,864,133.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
//                 </svg>
//             </div>

//             {isOpen && (
//                 <Model onClose={() => setIsOpen(false)}>
//                     <InputForm formClose={() => setIsOpen(false)} />
//                 </Model>
//             )}

//             <div className='recipe'>
//                 {location.pathname === "/myRecipe" ? (
//                     <RecipeItems allRecipes={filteredRecipes} />
//                 ) : (
//                     <RecipeItems allRecipes={recipes} />
//                 )}
//             </div>
//         </>
//     );
// };

// export default Home;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import Model from '../components/Model';
import RecipeItems from '../components/RecipeItems';
import foodRecipe from '../src/assets/pic3.jpg';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const favRecipes = JSON.parse(localStorage.getItem("fav")) || [];
    const [recipes, setRecipes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addRecipe = () => {
        if (token)
            navigate('addFoodRecipe');
        else
            setIsOpen(true);
    };

    // 🔄 Fetch all recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get(`${process.env.VITE_API_BASE_URL}/recipe`);
                setRecipes(res.data);
            } catch (err) {
                console.error('Error fetching recipes:', err);
            }
        };
        fetchRecipes();
    }, []);

    // 👀 Show only user's recipes on /myRecipe
    const filteredRecipes =
        location.pathname === "/myRecipe" && user
            ? recipes.filter(recipe => recipe.createdBy === user._id)
            : recipes;
    const filteredFavRecipes =
        location.pathname === "/favRecipe"
            ? recipes.filter(recipe => favRecipes.some(fav => fav._id === recipe._id))
            : recipes;
    return (
        <>
            <section className='home'>
                <div className="left">
                    <h1>Food Recipe</h1>
                    <h5>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </h5>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className="right">
                    <img src={foodRecipe} width="320px" height="300px" alt="Recipe Visual" />
                </div>
            </section>

            <div className="bg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#d4f6e8" fillOpacity="1" d="M0,32L48,58.7C96,85,192,139,288,165.3C384,192,480,192,576,176C672,160,768,128,864,133.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
                </svg>
            </div>

            {isOpen && (
                <Model onClose={() => setIsOpen(false)}>
                    <InputForm formClose={() => setIsOpen(false)} />
                </Model>
            )}

            <div className='recipe'>
                {location.pathname === "/favRecipe" ? (
                    filteredFavRecipes.length > 0 ? (
                        <RecipeItems allRecipes={filteredFavRecipes} />
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                            You haven't marked any recipes as favorite.
                        </p>
                    )
                ) : filteredRecipes.length > 0 ? (
                    <RecipeItems allRecipes={filteredRecipes} />
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                        {location.pathname === "/myRecipe"
                            ? "You haven't added any recipes yet."
                            : "No recipes available."}
                    </p>
                )}
            </div>

        </>
    );
};

export default Home;
