import React, { useContext } from 'react';
import { AppContext } from '../data/AppContext';
import PersonProfile from '../components/PersonProfile';
import { Container, Card, ListGroup } from 'react-bootstrap';

const Lab1 = () => {
    const { items, dispatch } = useContext(AppContext); // Uzyskanie items i dispatch z kontekstu

    return (
        <Container className="mt-5">
            {/* Tytuł sekcji z miętowym tłem */}
            <h1 className="text-center mb-4" style={{ backgroundColor: '#e0f7fa', padding: '10px', borderRadius: '5px' }}>
                Laboratorium 1
            </h1>
            
            {/* Lista osób */}
            {items.map(person => (
                <Card key={person.id} className="mb-4 shadow-sm">
                    <Card.Body>
                        <PersonProfile person={person} dispatch={dispatch} />
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default Lab1;
