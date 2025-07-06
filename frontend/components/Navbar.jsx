import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import InputForm from "./InputForm";
import Model from "./Model";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [isLogin, setIsLogin] = useState(token ? true : false);
    useEffect(() => {
        setIsLogin(token ? true : false);
    }, [token]);
    const checkLogin = () => {
        if (token) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            setIsLogin(false);
        } else {
            setIsOpen(true);
        }
    }

    return (
        <>
            <header>
                <h2>
                    Food Blog
                </h2>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li onClick={() => !isLogin && setIsOpen(true)}><NavLink to={isLogin ? '/myRecipe' : '/'}>My Recipe</NavLink></li>
                    <li onClick={() => !isLogin && setIsOpen(true)}><NavLink to={isLogin ? '/favRecipe' : '/'}>Favourites</NavLink></li>
                    <li onClick={checkLogin}>
                        <p className="login">
                            {isLogin ? `Logout (${user?.username})` : "Login"}
                        </p>
                    </li>
                </ul>
            </header>
            {(isOpen) && <Model onClose={() => setIsOpen(false)}><InputForm formClose={() => setIsOpen(false)} /></Model>}
        </>
    )
}

export default Navbar