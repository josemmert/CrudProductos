import { Form, Button, FormGroup, FormLabel } from "react-bootstrap";

const CrearProducto = () => {
  //Los productos van a tener las siguientes prop,
  //titulo, descripcion y categoria; de fondo, ademas va a tener un identificador unico.
  const handleSubmit=(e)=>{
    e.preventDefault();
    alert('tocaste submit')
  };

  return (
    <div className="container py-3 my-3">
      <div className="text-center">
        <h2>Crear Producto</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese el titulo del producto"
            minLength={4}
            maxLength={25}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese una descripción"
            as="textarea"
            rows={3}
            minLength={4}
            maxLength={200}
          />
        </Form.Group>
        <FormGroup className="mb-3" controlId="category">
          <FormLabel>Categoria</FormLabel>
          <Form.Select aria-label="Default select example">
            <option value=''>Seleccione una categoria</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Limpieza">Limpieza</option>
          </Form.Select>
        </FormGroup>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default CrearProducto;
