import { Card, Button, Col } from "react-bootstrap";

const CardProducto = ({ producto }) => {
  return (
    <Col xs={12} md={6}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="fs-2">{producto.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted fs-5">
           {producto.category}
          </Card.Subtitle>
          <Card.Text className="mb-2">
            {producto.description}
          </Card.Text>
          <Button variant="primary">Ver el producto</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProducto;
