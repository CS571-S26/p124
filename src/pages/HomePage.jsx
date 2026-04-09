import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';

import SearchBar from '../components/SearchBar';
import BookCard from "../components/BookCard"
import BookSearchContext from '../contexts/BookSearchContext';


function HomePage() {

    const [books, setBooks] = useState([]);
    const { query } = useContext(BookSearchContext);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            setBooks(data.items || []);
        })
        .catch(err => {
            console.log("Fetch error:", err);
            setBooks([]); 
        });
    }, [query])

    return (
        <div>
            <SearchBar/>
            <Row>
                {books.length === 0 ?  
                (<h3>No books found</h3>) :
                (books.map((book) => (
                <Col xs = {12} sm = {6} md = {4} lg = {3} key = {book.id}>
                    <BookCard title = {book.volumeInfo.title} authors = {book.volumeInfo.authors} volumeInfo = {book.volumeInfo} description = {book.volumeInfo.description}/>
                </Col>)))}
            </Row>
        </div>
    );
}

export default HomePage;