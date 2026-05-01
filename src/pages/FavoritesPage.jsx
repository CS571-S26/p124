import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [ratings, setRatings] = useState({});
    const [sortBy, setSortBy] = useState("default");

    // Load saved books + ratings
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favorites")) || [];
        const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};

        setFavorites(saved);
        setRatings(savedRatings);
    }, []);

    // Remove book
    const removeBook = (id) => {
        setFavorites(prev => {
            const updated = prev.filter(book => book.id !== id);
            localStorage.setItem("favorites", JSON.stringify(updated));
            return updated;
        });

        setRatings(prev => {
            const updatedRatings = { ...prev };
            delete updatedRatings[id];
            localStorage.setItem("ratings", JSON.stringify(updatedRatings));
            return updatedRatings;
        });
    };

    // Update rating
    const updateRating = (id, value) => {
        setRatings(prev => {
            const updated = {
                ...prev,
                [id]: value
            };
            localStorage.setItem("ratings", JSON.stringify(updated));
            return updated;
        });
    };

    // SORT LOGIC
    const sortedFavorites = [...favorites].sort((a, b) => {
        const ratingA = ratings[a.id] || 0;
        const ratingB = ratings[b.id] || 0;

        if (sortBy === "rating-high") {
            return ratingB - ratingA;
        }

        if (sortBy === "rating-low") {
            return ratingA - ratingB;
        }

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

            {/* SORT DROPDOWN */}
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
                    {sortedFavorites.map(book => (
                        <Col key={book.id} xs={12} md={6} lg={4} className="mb-3">
                            <Card className="h-100 shadow-sm">

                                {/* COVER */}
                                <Card.Img
                                    src={book.imageLinks?.thumbnail}
                                    alt={book.title || "Book cover"}
                                />

                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>

                                    <Card.Subtitle className="mb-2 text-muted">
                                        {book.authors?.join(", ") || "Unknown Author"}
                                    </Card.Subtitle>

                                    {/* RATING */}
                                    <Form.Group className="mb-2">
                                        <Form.Label>Rating (1–10)</Form.Label>
                                        <Form.Select
                                            value={ratings[book.id] || ""}
                                            onChange={(e) =>
                                                updateRating(book.id, Number(e.target.value))
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

                                    {/* REMOVE BUTTON */}
                                    <Button
                                        variant="danger"
                                        onClick={() => removeBook(book.id)}
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