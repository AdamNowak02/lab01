import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FlexContainer({ element: Element, data }) {
  return (
    <Container>
      <Row>
        {data.map(item => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Element {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FlexContainer;
