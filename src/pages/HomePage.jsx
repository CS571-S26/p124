import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';

import SearchBar from '../components/SearchBar';
import BookCard from "../components/BookCard"
import BookSearchContext from '../contexts/BookSearchContext';
import FilterPanel from '../components/FilterPanel';


function HomePage() {

    const [books, setBooks] = useState([]);
    const [fiction, setFiction] = useState([]);
    const [fantasy, setFantasy] = useState([]);
    const [mystery, setMystery] = useState([]);
    const [scifi, setScifi] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        subject: "",
        orderBy: "relevance",
        author: "",
        language: ""
    });
    const [loading, setLoading] = useState(false);

    const { query } = useContext(BookSearchContext);
    const isSearching = query && query.trim() !== "";

    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

    useEffect(() => {
        if (!query) return;
        
        setLoading(true);
        let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

        if (filters.subject) {
            url += `+subject:${filters.subject}`;
        }

        if (filters.author) {
            url += `+inauthor:${filters.author}`;
        }

        url += `&orderBy=${filters.orderBy}&maxResults=20`;

        if (filters.language) {
            url += `&langRestrict=${filters.language}`;
        }

        url += `&key=${API_KEY}`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            setBooks(data.items || []);
            setLoading(false);
        })
        .catch(err => {
            console.log("Fetch error:", err);
            setBooks([]); 
            setLoading(false);
        });
    }, [query, filters, API_KEY])

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=8&key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setFiction(data.items || []));
    }, [API_KEY]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&orderBy=relevance&maxResults=8&key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setFantasy(data.items || []));
    }, [API_KEY]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:mystery&orderBy=relevance&maxResults=8&key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setMystery(data.items || []));
    }, [API_KEY]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:science%20fiction&orderBy=relevance&maxResults=8&key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setScifi(data.items || []))
            .catch(err => {
                console.log("Fetch error:", err);
                setScifi([]);
            });
    }, [API_KEY]);

    return (
        <div>
            <Container className="mb-3" >
                <Row className="justify-content-center px-0">
                    <Col xs={12} md={10} lg={8}>
                        <div className="d-flex align-items-center w-100 gap-2">
                            <div className="position-relative">
                                <Button variant="primary" onClick={() => setShowFilters(!showFilters)}>
                                    Filters
                                </Button>
                                {showFilters && (
                                    <div className="filter-popup">
                                        <FilterPanel
                                            filters={filters}
                                            setFilters={setFilters}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow-1">
                                <SearchBar/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {isSearching ? (
                <Container>
                    {loading ? (<h4>Loading...</h4>) : (
                    <Row>
                        {books.length === 0 ? (
                            <h3>No books found</h3>
                        ) : (
                            books.map((book) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={book.id}>
                                    <BookCard
                                        title={book.volumeInfo.title  || "No Title"}
                                        authors={book.volumeInfo.authors || ["Unknown Author"]}
                                        volumeInfo={book.volumeInfo}
                                        description={book.volumeInfo.description || "No description available"}
                                    />
                                </Col>
                            ))
                        )}
                    </Row>)}
                </Container>
            ) : (
                <>
                    <div className="genre-section">
                        <h3 className="genre-title">Fiction</h3>
                        <div className="horizontal-scroll">
                            {fiction.map(book => (
                                <div className="scroll-card" key={book.id}>
                                    <BookCard
                                        title={book.volumeInfo.title}
                                        authors={book.volumeInfo.authors}
                                        volumeInfo={book.volumeInfo}
                                        description={book.volumeInfo.description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="genre-section">
                        <h3 className="genre-title">Fantasy</h3>
                        <div className="horizontal-scroll">
                            {fantasy.map(book => (
                                <div className="scroll-card" key={book.id}>
                                    <BookCard
                                        title={book.volumeInfo.title}
                                        authors={book.volumeInfo.authors}
                                        volumeInfo={book.volumeInfo}
                                        description={book.volumeInfo.description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="genre-section">
                        <h3 className="genre-title">Mystery</h3>
                        <div className="horizontal-scroll">
                            {mystery.map(book => (
                                <div className="scroll-card" key={book.id}>
                                    <BookCard
                                        title={book.volumeInfo.title}
                                        authors={book.volumeInfo.authors}
                                        volumeInfo={book.volumeInfo}
                                        description={book.volumeInfo.description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="genre-section">
                        <h3 className="genre-title">Science Fiction</h3>
                        <div className="horizontal-scroll">
                            {scifi.map(book => (
                                <div className="scroll-card" key={book.id}>
                                    <BookCard
                                        title={book.volumeInfo.title}
                                        authors={book.volumeInfo.authors}
                                        volumeInfo={book.volumeInfo}
                                        description={book.volumeInfo.description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
        
    );
}

export default HomePage;