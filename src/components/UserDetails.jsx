import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Container, Card, ListGroup } from 'react-bootstrap';

const UserDetails = () => {
  const { id } = useParams();
  const [user] = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`); // Pobranie danych z API

  if (!user) {
    return <div>Ładowanie danych użytkownika...</div>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">User details</h2>
      
      <Card className="shadow-sm">
        <Card.Body>
          {/* Imię z zielonym tłem */}
          <Card.Title className="p-3" style={{ backgroundColor: '#e0f7f3' }}>
            {user.name}
          </Card.Title>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Email:</strong> {user.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone:</strong> {user.phone}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Username:</strong> {user.username}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDetails;
