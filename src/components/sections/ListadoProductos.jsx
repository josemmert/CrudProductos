import { useEffect, useState } from "react";
import { Form, Table, FormGroup, FormLabel, Row, Col } from "react-bootstrap";
import Producto from "./Producto";
import ModalEditar from "./ModalEditar";

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [productEdit, setProductEdit] = useState(undefined);
  const [filtroProducto, setFiltroProducto] = useState("");
  const [busquedaTitulo, setBusquedaTitulo]= useState("");

  const handleClose = () => {
    setProductEdit(undefined);
    setShow(false);
  };
  const handleShow = (prod) => {
    setProductEdit(prod);
    setShow(true);
  };

  const API = import.meta.env.VITE_API;

  /*CICLO DE VIDA DE TODO COMPONENTE
    1. MONTAJE
    2. ACTUALIZACION
    3. DESMONTAJE*/

  const getProductos = async () => {
    try {
      let URL = `${API}/products`;
      if (filtroProducto !== "" && busquedaTitulo==="") {
        URL = `${API}/products?filtro=${filtroProducto}`;
      }else if (filtroProducto !== "" && busquedaTitulo!=="") {
        URL = `${API}/products?filtro=${filtroProducto}&busqueda=${busquedaTitulo}`;
      }else if (filtroProducto === "" && busquedaTitulo!=="") {
        URL = `${API}/products?busqueda=${busquedaTitulo}`;
      }
      const response = await fetch(URL);
      //console.log('RESPONSE-->', response);
      const resJson = await response.json();
      //console.log('RESJSON', resJson);
      setProductos(resJson);
    } catch (error) {
      console.log("Error-->", error);
    }
  };

  // useEffect(() => {
  //   getProductos();

  //   return () => {
  //     setProductos([]);
  //   };
  // }, []);

  useEffect(() => {
    getProductos();
  }, [filtroProducto,busquedaTitulo]);

  //console.log("FiltroBusqueda", busquedaTitulo);

  return (
    <>
      <ModalEditar
        show={show}
        handleClose={handleClose}
        producto={productEdit}
        getProductos={getProductos}
      />
      <div className="container-fluid">
        <div className="text-center">
          <h2>Listado Productos</h2>
        </div>
        <div className="container-fluid">
          <Row>
            <Col xs={12} md={6}>
              <Form>
                <FormGroup className="mb-3" controlId="category">
                  <FormLabel>Filtrar por categoría</FormLabel>
                  <Form.Select
                    aria-label="category"
                    name="category"
                    onChange={(e) => {
                      setFiltroProducto(e.currentTarget.value);
                    }}
                  >
                    <option value="">Todas</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Limpieza">Limpieza</option>
                  </Form.Select>
                </FormGroup>
              </Form>
            </Col>
            <Col xs={12} md={6}>
              <Form onSubmit={(e)=>{
                e.preventDefault();
              }}>
                <Form.Group controlId="busqueda">
                  <Form.Label>Buscar por Titulo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el titulo del producto"
                    name="title"
                    onChange={(e) => {
                      setBusquedaTitulo(e.currentTarget.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((element) => {
                return (
                  <Producto
                    producto={element}
                    handleShow={handleShow}
                    key={element._id}
                    getProductos={getProductos}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListadoProductos;
