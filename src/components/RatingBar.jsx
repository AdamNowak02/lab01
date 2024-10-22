import React from 'react';

// Komponent RatingBar
const RatingBar = ({ rate }) => {
    const totalStars = 10; // Łączna liczba gwiazdek

    return (
        <div className="rating-bar">
            {Array.from({ length: totalStars }, (_, index) => (
                <span key={index} className="star">
                    {/* Sprawdź, czy indeks jest mniejszy niż ocena i wypełnij gwiazdkę */}
                    {index < rate ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

export default RatingBar;
