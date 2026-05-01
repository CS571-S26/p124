import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import SavedPage from "./pages/SavedPage";
import FullBookView from "./pages/FullBookView";
import RandomBook from "./pages/RandomBook";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './App.css';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/saved" element = {<SavedPage />}/>
        <Route path="/book" element={<FullBookView />} />
        <Route path="/random" element={<RandomBook />} />
      </Routes>
    </>
  );
}

export default App;