import React, { useState } from 'react';
import RatingBar from './RatingBar'; // Importuj komponent RatingBar

const PersonProfile = ({ person, onEdit, onDelete }) => {
    const [rating, setRating] = useState(person.rating || 0); // Używaj oceny z obiektu person

    const handleRate = () => {
        if (rating === 10) {
            setRating(0);
        } else {
            setRating(prevRating => prevRating + 1);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">ID: {person.id}</p>
                <p className="card-text">Birth Date: {person.birth}</p>
                <p className="card-text">Eye Color: {person.eyes}</p>
                <p className="card-text">Rating: {rating}</p>
                <RatingBar rate={rating} /> {/* Wyświetlanie gwiazdek */}

                {/* Przyciski */}
                <button className="btn btn-primary me-2" onClick={() => onEdit(person.id)}>
                    Edit
                </button>
                <button className="btn btn-danger me-2" onClick={() => onDelete(person.id)}>
                    Delete
                </button>
                <button className="btn btn-warning" onClick={handleRate}>
                    Rate
                </button>
            </div>
        </div>
    );
};

export default PersonProfile;
