import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Container, Card, ListGroup } from 'react-bootstrap';

const PostComments = () => {
  const { id } = useParams();
  const [post] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`); // Pobranie danych z API
  const [comments] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

  if (!post || !comments) {
    return <div>Ładowanie postu i komentarzy...</div>;
  }

  return (
    <Container className="mt-5">
      <h2 
        className="text-center mb-4 py-2" 
        style={{ backgroundColor: '#e0f7fa', borderRadius: '5px' }}
      >
        Post: {post.title}
      </h2>

      {/* Wyświetlenie postu w karcie */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
      </Card>

      <h3 className="mb-3">Comments:</h3>

      {/* Lista komentarzy w formie listy grupowanej */}
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id} className="border-light">
            <strong>{comment.name}</strong> ({comment.email})
            <p>{comment.body}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default PostComments;
