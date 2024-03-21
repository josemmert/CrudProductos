import axios from "axios";
import {useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CardProducto from "../sections/CardProducto";


const Home = () => {

  const [productos, setProductos] = useState([]);

  const API = import.meta.env.VITE_API;

  const getProductos = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      console.log("Response Axios-->", response);
      /*const products=response.data;
      setProductos(productos);*/
      setProductos(response.data);
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
    <div>
      <div className="text-center">
        <h2>Catalogo de productos</h2>
      </div>
      <div className="my-5">
        <Container>
          <Row>
            {productos.map((element, index) => {
              return(
                <CardProducto producto={element} key={index} />
              ); 
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
