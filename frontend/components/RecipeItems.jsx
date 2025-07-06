import axios from "axios";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoIosStopwatch } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const RecipeItems = ({ allRecipes }) => {
    const navigate = useNavigate();
    const path = window.location.pathname === '/myRecipe';
    const [isfav, setIsFav] = useState(false);
    const token = sessionStorage.getItem("token");
    let favItem = JSON.parse(localStorage.getItem("fav")) ?? [];

    const onDelete = async (id, e) => {
        e.stopPropagation(); // prevent card click
        if (!token) {
            alert("You need to login to delete a recipe");
            return;
        }
        try {
            const response = await axios.delete(`${process.env.VITE_API_BASE_URL}/recipe/${id}`);
            console.log("Recipe deleted successfully", response.data);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting recipe", error);
        }
    };

    const openRecipe = (id) => {
        navigate(`/recipe/${id}`);
    };

    const stopEvent = (e) => {
        e.stopPropagation(); // prevent click bubbling
    };

    const favRecipe = (item, e) => {
        e.stopPropagation();
        if (!token) {
            alert("You need to login to add a recipe to favorites");
            return;
        }
        const isAlreadyFav = favItem.some(recipe => recipe._id === item._id);
        if (isAlreadyFav) {
            favItem = favItem.filter(recipe => recipe._id !== item._id);
        } else {
            favItem.push(item);
        }
        localStorage.setItem("fav", JSON.stringify(favItem));
        setIsFav(prev => !prev); // Force re-render
    };

    return (
        <div className="card-container">
            {allRecipes?.map((item, index) => (
                <div
                    key={index}
                    className="card"
                    onClick={() => openRecipe(item._id)}
                >
                    <img
                        src={`${process.env.VITE_API_BASE_URL}/images/${item.coverImage}`}
                        width="120px"
                        height="100px"
                        alt={item.title}
                    />
                    <div className="card-body">
                        <div className="title">{item.title}</div>
                        <div className="icons">
                            <div className="timer">
                                <IoIosStopwatch /> {item.time} min
                            </div>

                            {!path ? (
                                <div
                                    className="heart"
                                    onClick={(e) => favRecipe(item, e)}
                                    style={{
                                        color: favItem.some(res => res._id === item._id) ? "red" : ""
                                    }}
                                >
                                    <FaHeart />
                                </div>
                            ) : (
                                <div className="action">
                                    <Link
                                        to={`/editRecipe/${item._id}`}
                                        className="editIcon"
                                        onClick={stopEvent}
                                    >
                                        <FaEdit />
                                    </Link>
                                    <MdDelete
                                        onClick={(e) => onDelete(item._id, e)}
                                        className="deleteIcon"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeItems;
