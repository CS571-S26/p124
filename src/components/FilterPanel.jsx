import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FilterPanel({ filters, setFilters }) {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="filter-box">

            <h4>Filters</h4>

            {/* Genre */}
            <Form.Group className="mb-2">
                <Form.Label>Genre</Form.Label>
                <Form.Select
                    name="subject"
                    value={filters.subject}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="fiction">Fiction</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="mystery">Mystery</option>
                    <option value="science fiction">Science Fiction</option>
                    <option value="romance">Romance</option>
                    <option value="horror">Horror</option>
                    <option value="history">History</option>
                    <option value="biography">Biography</option>
                </Form.Select>
            </Form.Group>

            {/* Author */}
            <Form.Group className="mb-2">
                <Form.Label>Author</Form.Label>
                <Form.Control
                    id="author-input"
                    type="text"
                    placeholder="e.g. Stephen King"
                    name="author"
                    value={filters.author || ""}
                    onChange={handleChange}
                />
            </Form.Group>

            {/* Language */}
            <Form.Group className="mb-2">
                <Form.Label>Language</Form.Label>
                <Form.Select
                    name="language"
                    value={filters.language || ""}
                    onChange={handleChange}
                >
                    <option value="">Any</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                </Form.Select>
            </Form.Group>

            {/* Sort */}
            <Form.Group className="mt-2">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                    name="orderBy"
                    value={filters.orderBy}
                    onChange={handleChange}
                >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                </Form.Select>
            </Form.Group>

            <Button 
                variant="secondary" 
                size="sm" 
                className="mt-3 w-100"
                onClick={() => setFilters({
                    subject: "",
                    orderBy: "relevance",
                    author: "",
                    language: ""
                })}
            >
                Clear Filters
            </Button>
        </div>
    );
}

export default FilterPanel;