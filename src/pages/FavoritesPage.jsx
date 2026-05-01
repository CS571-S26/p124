import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FavoritesPage() {
    const navigate = useNavigate();

    const [favorites, setFavorites] = useState([]);
    const [ratings, setRatings] = useState({});
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favorites")) || [];
        const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};

        setFavorites(saved);
        setRatings(savedRatings);
    }, []);

    const removeBook = (title) => {
        setFavorites(prev => {
            const updated = prev.filter(book => book.title !== title);
            localStorage.setItem("favorites", JSON.stringify(updated));
            return updated;
        });

        setRatings(prev => {
            const updated = { ...prev };
            delete updated[title];
            localStorage.setItem("ratings", JSON.stringify(updated));
            return updated;
        });
    };

    const updateRating = (title, value) => {
        setRatings(prev => {
            const updated = {
                ...prev,
                [title]: value
            };
            localStorage.setItem("ratings", JSON.stringify(updated));
            return updated;
        });
    };

    const openBook = (book) => {
        navigate("/book", { state: { book } });
    };

    const sortedFavorites = [...favorites].sort((a, b) => {
        const ratingA = ratings[a.title] || 0;
        const ratingB = ratings[b.title] || 0;

        if (sortBy === "rating-high") return ratingB - ratingA;
        if (sortBy === "rating-low") return ratingA - ratingB;

        if (sortBy === "title-az") {
            return (a.title || "").localeCompare(b.title || "");
        }

        if (sortBy === "title-za") {
            return (b.title || "").localeCompare(a.title || "");
        }

        return 0;
    });

    return (
        <Container className="my-4 pb-5">
            <h1 className="mb-3">Your Favorites</h1>

            <Form.Group className="mb-3" style={{ maxWidth: "250px" }}>
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="rating-high">Rating: High → Low</option>
                    <option value="rating-low">Rating: Low → High</option>
                    <option value="title-az">Title: A → Z</option>
                    <option value="title-za">Title: Z → A</option>
                </Form.Select>
            </Form.Group>

            {favorites.length === 0 ? (
                <p>No books saved yet.</p>
            ) : (
                <Row>
                    {sortedFavorites.map((book, index) => (
                        <Col
                            key={`${book.title}-${index}`}
                            xs={12}
                            md={6}
                            lg={4}
                            className="mb-3"
                        >
                            <Card
                                className="book-card h-100 shadow-sm"
                                onClick={() => openBook(book)}
                            >
                                <Card.Img
                                    src={book.imageLinks?.thumbnail}
                                    alt={book.title || "Book cover"}
                                />

                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>

                                    <Card.Subtitle className="mb-2 text-muted">
                                        {book.authors?.join(", ") || "Unknown Author"}
                                    </Card.Subtitle>

                                    <Form.Group className="mb-2" onClick={(e) => e.stopPropagation()}>
                                        <Form.Label>Rating (1–10)</Form.Label>
                                        <Form.Select
                                            value={ratings[book.title] || ""}
                                            onChange={(e) =>
                                                updateRating(book.title, Number(e.target.value))
                                            }
                                        >
                                            <option value="">Not rated</option>
                                            {Array.from({ length: 10 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Button
                                        variant="danger"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeBook(book.title);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default FavoritesPage;