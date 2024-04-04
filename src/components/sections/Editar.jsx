import { Form, Button, FormGroup, FormLabel } from "react-bootstrap";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Editar = () => {
  const [producto, setProducto] = useState(undefined);

  const { id } = useParams();

  const API = import.meta.env.VITE_API;

  const getProducto = async () => {
    try {
      const { data } = await axios.get(`${API}/products/${id}`);
      setProducto(data);
    } catch (error) {
      console.log("Error-->", error);
    }
  };

  useEffect(() => {
    console.log("ID del producto a editar-->", id);
    getProducto();
  }, []);

  //utilizamos useNavigate de react router dom

  const navigate = useNavigate();
  //INICIO DE CONFIGURTACION DE FORMIK
  const ProductoSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "min 4 caracteres")
      .max(20, "max 20 caracteres")
      .required("El titulo es requerido"),
    description: Yup.string()
      .min(4, "min 4 caracteres")
      .max(200, "max 200 caracteres")
      .required("El descripción es requerida"),
    category: Yup.string().required("La categoria es requerida"),
  });

  const initialValues = {
    title: "",
    description: "",
    category: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ProductoSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("Values de Formik-->", values);

      Swal.fire({
        title: "¿Estas seguro de editar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            
            const updateProduct={
              _id: producto._id,
              title: values.title,
              category: values.category,
              description: values.description
            };

            /*const response = await fetch(`${API}/productos/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });*/

            const response=await axios.put(`${API}/products/update`, updateProduct)
            if (response.status === 200) {
              
              Swal.fire({
                title: "Exito",
                text: "Se actualizó el producto",
                icon: "success",
              });
              navigate('/administracion');
            }
          } catch (error) {
            console.log("ERROR-->", error);
          }
        }
      });
    },
  });

  //FIN DE CONFIGURACION DE FORMIK

  useEffect(() => {
    if (producto !== undefined) {
      formik.setFieldValue("title", producto.title, true);
      formik.setFieldValue("description", producto.description, true);
      formik.setFieldValue("category", producto.category, true);
    }
  }, [producto]);

  return (
    <div className="container py-3 my-3">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Atras
      </Button>
      <div className="text-center">
        <h2>Editar Producto</h2>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el titulo del producto"
            minLength={4}
            maxLength={25}
            name="title"
            {...formik.getFieldProps("title")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.title && formik.errors.title,
              },
              {
                "is-valid": formik.touched.title && !formik.errors.title,
              }
            )}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.title}</span>
            </div>
          )}
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
            name="description"
            {...formik.getFieldProps("description")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.description && formik.errors.description,
              },
              {
                "is-valid":
                  formik.touched.description && !formik.errors.description,
              }
            )}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.description}</span>
            </div>
          )}
        </Form.Group>
        <FormGroup className="mb-3" controlId="category">
          <FormLabel>Categoria</FormLabel>
          <Form.Select
            aria-label="category"
            name="category"
            {...formik.getFieldProps("category")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.category && formik.errors.category,
              },
              {
                "is-valid": formik.touched.category && !formik.errors.category,
              }
            )}
          >
            <option value="">Seleccione una categoria</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Limpieza">Limpieza</option>
          </Form.Select>
          {formik.touched.category && formik.errors.category && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.category}</span>
            </div>
          )}
        </FormGroup>

        <Button variant="primary" type="submit">
          Editar Producto
        </Button>
      </Form>
    </div>
  );
};

export default Editar;
