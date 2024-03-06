import axios from "axios";
import "./borrarProducto.css"
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const BorrarProducto = ({id, getProductos }) => {
    const API = import.meta.env.VITE_API;

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
                await axios.delete(`${API}/productos/${id}`)
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
        <div>
            
            <Button type="button" variant="danger" onClick={(handleDelete)}>
                Eliminar
                </Button>
        </div>
    );
};

export default BorrarProducto;