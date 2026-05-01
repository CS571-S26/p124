import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SavedPage() {
    const [savedBooks, setSavedBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedBooks")) || [];
        setSavedBooks(saved);
    }, []);

    const openBook = (book) => {
        navigate("/book", { state: { book } });
    };

    const removeBook = (title) => {
        const updated = savedBooks.filter(book => book.title !== title);
        setSavedBooks(updated);
        localStorage.setItem("savedBooks", JSON.stringify(updated));
    };

    return (
        <Container className="my-4 pb-5">
            <h1 className="mb-4">Saved Books</h1>

            {savedBooks.length === 0 ? (
                <p>No books saved yet.</p>
            ) : (
                <Row>
                    {savedBooks.map((book, index) => (
                        <Col
                            key={`${book.title}-${index}`}
                            xs={12}
                            md={6}
                            lg={4}
                            className="mb-3"
                        >
                            <Card
                                className="shadow-sm rounded book-card"
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

                                    <p className="text-muted">
                                        {book.publisher || "No publisher info"}
                                    </p>

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

export default SavedPage;