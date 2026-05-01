import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

function FullBookView() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const book = state?.book;

    // If no book is passed, avoid crashes
    if (!book) {
        return (
            <Container className="mt-4">
                <h3>No book data available</h3>
                <Button onClick={() => navigate("/")}>
                    Go Home
                </Button>
            </Container>
        );
    }

    const [isFavorite, setIsFavorite] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Sync state with localStorage whenever book changes
    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];

        setIsFavorite(favs.some(b => b.id === book.id));
        setIsSaved(savedBooks.some(b => b.id === book.id));
    }, [book.id]);

    // Toggle favorite
    const toggleFavorite = () => {
        const favs = JSON.parse(localStorage.getItem("favorites")) || [];

        const exists = favs.some(b => b.id === book.id);

        const updated = exists
            ? favs.filter(b => b.id !== book.id)
            : [...favs, book];

        localStorage.setItem("favorites", JSON.stringify(updated));
        setIsFavorite(!exists);
    };

    // Toggle saved
    const toggleSaved = () => {
        const saved = JSON.parse(localStorage.getItem("savedBooks")) || [];

        const exists = saved.some(b => b.id === book.id);

        const updated = exists
            ? saved.filter(b => b.id !== book.id)
            : [...saved, book];

        localStorage.setItem("savedBooks", JSON.stringify(updated));
        setIsSaved(!exists);
    };

    const info = book;

    return (
        <Container className="my-4 pb-5">
            <Button className="mb-3" onClick={() => navigate(-1)}>
                ← Back
            </Button>

            <Row>
                {/* Cover */}
                <Col md={4}>
                    <Card>
                        <Card.Img
                            src={info.imageLinks?.thumbnail}
                            alt={info.title || "Book cover"}
                        />
                    </Card>
                </Col>

                {/* Main Info */}
                <Col md={8}>
                    <h2>{info.title}</h2>

                    {/* ACTION BUTTONS */}
                    <div className="d-flex gap-2 mb-3">
                        <Button
                            variant={isFavorite ? "danger" : "outline-danger"}
                            onClick={toggleFavorite}
                            aria-label="Toggle favorite"
                        >
                            {isFavorite ? "♥ Favorited" : "♡ Favorite"}
                        </Button>

                        <Button
                            variant={isSaved ? "success" : "outline-success"}
                            onClick={toggleSaved}
                            aria-label="Toggle saved"
                        >
                            {isSaved ? "✓ Saved" : "+ Want to Read"}
                        </Button>
                    </div>

                    <h5 className="text-muted">
                        {info.authors?.join(", ") || "Unknown Author"}
                    </h5>

                    <p className="mt-3">
                        {info.description || "No description available."}
                    </p>

                    <hr />

                    {/* Publication Info */}
                    <h5>Publication Info</h5>
                    <ListGroup className="mb-3">
                        <ListGroup.Item>
                            <strong>Published:</strong> {info.publishedDate || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Publisher:</strong> {info.publisher || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Pages:</strong> {info.pageCount || "N/A"}
                        </ListGroup.Item>
                    </ListGroup>

                    {/* Details */}
                    <h5>Details</h5>
                    <ListGroup className="mb-3">
                        <ListGroup.Item>
                            <strong>Language:</strong> {info.language || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Categories:</strong>{" "}
                            {info.categories?.join(", ") || "N/A"}
                        </ListGroup.Item>
                    </ListGroup>

                    {/* Ratings */}
                    <h5>Ratings</h5>
                    <ListGroup className="mb-3">
                        <ListGroup.Item>
                            {info.averageRating ? (
                                <>
                                    <strong>Average:</strong> {info.averageRating} ⭐
                                    <br />
                                    <strong>Ratings count:</strong>{" "}
                                    {info.ratingsCount || 0}
                                </>
                            ) : (
                                "No ratings available"
                            )}
                        </ListGroup.Item>
                    </ListGroup>

                    {/* ISBN */}
                    <h5>ISBN</h5>
                    <ListGroup className="mb-3">
                        <ListGroup.Item>
                            {info.industryIdentifiers ? (
                                info.industryIdentifiers.map((id, index) => (
                                    <div key={index}>
                                        <strong>{id.type}:</strong> {id.identifier}
                                    </div>
                                ))
                            ) : (
                                "No ISBN available"
                            )}
                        </ListGroup.Item>
                    </ListGroup>

                    {/* External Links */}
                    <h5>External Links</h5>
                    <div className="d-flex gap-2">
                        {info.previewLink && (
                            <a
                                href={info.previewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary"
                            >
                                Preview Book
                            </a>
                        )}

                        {info.infoLink && (
                            <a
                                href={info.infoLink}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline-secondary"
                            >
                                More Info
                            </a>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default FullBookView;