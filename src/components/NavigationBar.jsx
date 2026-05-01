import { Link } from "react-router-dom";
import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import BookSearchContext from '../contexts/BookSearchContext';

function NavigationBar() {
  const { setQuery } = useContext(BookSearchContext);
  return (
    <div >
        <Navbar bg="light">
            <Container>
                <Navbar.Brand as = {Link} to = "/" onClick = {() => setQuery("")}>
                    <h1>Book Finder</h1>
                </Navbar.Brand>
                <Nav className="gap-3">
                    <Nav.Link as = {Link} to="/"  onClick = {() => setQuery("")}>Home</Nav.Link>
                    <Nav.Link as = {Link} to="/favorites">Favorites</Nav.Link>
                    <Nav.Link as = {Link} to="/saved">Saved</Nav.Link>
                    <Nav.Link as = {Link} to="/random">Random</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
  );
}

export default NavigationBar;