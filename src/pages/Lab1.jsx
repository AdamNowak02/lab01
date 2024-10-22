import React from 'react';
import { data } from '../module-data.js'; // Import danych
import PersonProfile from '../components/PersonProfile'; // Import komponentu profilu

function Lab1() {
    // Funkcje do obsługi przycisków
    const handleEdit = (id) => {
        console.log("Edit clicked for ID:", id);
        // Tutaj możesz dodać logikę edycji
    };

    const handleDelete = (id) => {
        console.log("Delete clicked for ID:", id);
        // Tutaj możesz dodać logikę usuwania
    };

    const handleRate = (id) => {
        console.log("Rate clicked for ID:", id);
        // Tutaj możesz dodać logikę oceniania
    };

    return (
        <div>
            <h1>Laboratorium 1</h1>
            <ul>
                {data.map(person => (
                    <li key={person.id}>
                        <PersonProfile 
                            person={person} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete} 
                            onRate={handleRate} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Lab1;
