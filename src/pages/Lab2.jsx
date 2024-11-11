import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { data } from '../module-data.js';

function Lab2() {
    const { id } = useParams();
    const person = data.find(p => p.id.toString() === id); // Wyszukanie osoby po id

    if (!id) {
        return <h1>Brak identyfikatora osoby.</h1>;
    }

    if (!person) {
        return <h1>Nie znaleziono osoby o tym identyfikatorze.</h1>;
    }

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4" style={{ backgroundColor: '#e0f7fa', padding: '10px', borderRadius: '5px' }}>Profil osoby</h1>
            
            {/* Karta z informacjami o osobie */}
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Text><strong>Imię:</strong> {person.name}</Card.Text>
                    <Card.Text><strong>Data urodzenia:</strong> {person.birth}</Card.Text>
                    <Card.Text><strong>Kolor oczu:</strong> {person.eyes}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Lab2;
