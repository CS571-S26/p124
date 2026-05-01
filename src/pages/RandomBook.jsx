import { useEffect, useState } from "react";
import { Container, Spinner, Button } from "react-bootstrap";
import BookCard from "../components/BookCard";

function RandomBook() {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

    const subjects = [
        "fiction",
        "fantasy",
        "mystery",
        "history",
        "science",
        "romance",
        "horror",
        "biography",
        "technology",
        "adventure",
        "classics"
    ];

    const keywords = [
        "the",
        "life",
        "world",
        "story",
        "love",
        "dark",
        "journey",
        "secret",
        "chronicles",
        "chronicle"
    ];

    const fetchRandomBook = async () => {
        try {
            setLoading(true);

            const randomSubject =
                subjects[Math.floor(Math.random() * subjects.length)];

            const randomKeyword =
                keywords[Math.floor(Math.random() * keywords.length)];

            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=subject:${randomSubject}+${randomKeyword}&maxResults=40&key=${API_KEY}`
            );

            const data = await res.json();
            const items = data.items || [];

            if (!items.length) {
                setBook(null);
                return;
            }

            const randomBook =
                items[Math.floor(Math.random() * items.length)];

            setBook(randomBook);
        } catch (err) {
            console.log("Random book error:", err);
            setBook(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomBook();
    }, []);

    if (loading) {
        return (
            <Container className="text-center my-4">
                <Spinner animation="border" />
                <p>Loading random book...</p>
            </Container>
        );
    }

    if (!book) {
        return (
            <Container className="text-center my-4">
                <h3>No book found</h3>
                <Button onClick={fetchRandomBook}>
                    Try Again
                </Button>
            </Container>
        );
    }

    return (
        <Container className="my-4 d-flex flex-column align-items-center gap-3">
            <Button variant="primary" onClick={fetchRandomBook}>
                🎲 Get Another Book
            </Button>

            <div style={{ width: "220px" }}>
                <BookCard
                    id={book.id}
                    volumeInfo={book.volumeInfo}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    description={book.volumeInfo.description}
                />
            </div>
        </Container>
    );
}

export default RandomBook;