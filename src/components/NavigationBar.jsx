import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function NavigationBar() {
  return (
    <div >
        <Navbar bg="light">
            <Container>
                <Navbar.Brand as = {Link} to = "/">
                    <h1>Book Finder</h1>
                </Navbar.Brand>
                <Nav className="gap-3">
                    <Nav.Link as = {Link} to="/">Home</Nav.Link>
                    <Nav.Link as = {Link} to="/favorites">Favorites</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
  );
}

export default NavigationBar;