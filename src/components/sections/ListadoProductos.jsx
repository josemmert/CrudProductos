import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Producto from "./Producto";

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);

  const API = import.meta.env.VITE_API;

  /*CICLO DE VIDA DE TODO COMPONENTE
    1. MONTAJE
    2. ACTUALIZACION
    3. DESMONTAJE*/

  const getProductos = async () => {
    try {
      const response = await fetch(`${API}/productos`);
      //console.log('RESPONSE-->', response);
      const resJson = await response.json();
      //console.log('RESJSON', resJson);
      setProductos(resJson);
    } catch (error) {
      console.log("Error-->", error);
    }
  };

  useEffect(() => {
    getProductos();

    return () => {
      setProductos([]);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="text-center">
        <h2>Listado Productos</h2>
      </div>
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
            return <Producto producto={element} key={element.id} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoProductos;
