import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import BorrarProducto from "./BorrarProducto/BorrarProducto";
import Swal from "sweetalert2";
//import axios from "axios";


const Producto = ({producto, handleShow, getProductos}) => {
  const API= import.meta.env.VITE_API;
  const navigate=useNavigate();
  
  const handleDelete= ()=>{
    Swal.fire({
        title: "¿Estas seguro de eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Borrar",
        cancelButtonText: "No, me quivoque",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await fetch(`${API}/productos/${producto._id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
    
            });
            getProductos();
              Swal.fire({
                title: "Exito",
                text: "Se creó un nuevo producto",
                icon: "success",
              });
              
          } catch (error) {
            console.log("ERROR-->", error.message);
          }
        }
      });
    
}

  return (
    <>
      <tr>
        <td>{producto._id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around">
            <Button type="button" variant="warning" onClick={()=>{
              navigate(`/editar/${producto._id}`)
            }}>Editar</Button>
            <Button type="button" variant="success" onClick={()=>{
              console.log('modal edicion');
              handleShow(producto);
            }}>M.Editar</Button>
            <Button type="button" variant="danger" onClick={handleDelete}>Eliminar</Button>
            {/* <BorrarProducto id={producto.id} getProductos={getProductos}/> */}
        </td>
      </tr>
    </>
  );
};

export default Producto;
