import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function BookCard(props) {
    const navigate = useNavigate();
    return(
        <Card className="shadow-sm rounded" style={{ 
            transition: 'transform 0.2s',
            cursor: 'pointer',
            height: '100%' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => navigate("/book", { state: { book: props.volumeInfo } })}>
            <Card.Img src = {props.volumeInfo.imageLinks?.thumbnail} style={{objectFit: 'cover' }} alt={`Cover of ${props.title}`}></Card.Img>
            <Card.Body>
                <Card.Title style={{ 
                    fontSize: '0.9rem', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 4, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' }}>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.authors?.[0]}</Card.Subtitle>
                <Card.Text style={{ fontSize: '0.9rem', height: '80px', overflow: 'hidden' }}>{props.description || "No Summary Found"}</Card.Text>
            </Card.Body>
        </Card>
    );

}

export default BookCard;