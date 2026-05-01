import { Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import BookSearchContext from '../contexts/BookSearchContext';

function SearchBar() {

    const { query, setQuery } = useContext(BookSearchContext);
    const [input, setInput] = useState(query);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
            setQuery(input.trim());
        }
    }

    return (
        <Form className="d-flex justify-content-center my-3" onSubmit={handleSubmit}>
            <Form.Label htmlFor = "searchInput"></Form.Label>
            <Form.Control id = "searchInput" value = {input} onChange={(e) => setInput(e.target.value)} placeholder = "Search..." style={{ width: '700px', maxWidth: '90%' }}></Form.Control>
            <Button type="submit" variant="primary" className="ms-2">
                Search
            </Button>
        </Form>
        
    );
}

export default SearchBar;