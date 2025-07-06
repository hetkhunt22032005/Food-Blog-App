import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import AddFoodRecipe from '../pages/AddFoodRecipe';
import EditRecipe from '../pages/EditRecipe';
import Home from '../pages/Home';
import RecipePage from '../pages/RecipePage';
import './App.css';
function App() {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myRecipe" element={<Home />} />
        <Route path="/favRecipe" element={<Home />} />
        <Route path="/addFoodRecipe" element={<AddFoodRecipe />} />
        <Route path="/editRecipe/:id" element={<EditRecipe />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
