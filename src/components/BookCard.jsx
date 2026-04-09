import { Card } from 'react-bootstrap';

function BookCard(props) {

    return(
        <Card className="shadow-sm rounded" style={{ width: '18rem', margin: '1rem', transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <Card.Img src = {props.volumeInfo.imageLinks?.thumbnail} style={{objectFit: 'cover' }}></Card.Img>
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