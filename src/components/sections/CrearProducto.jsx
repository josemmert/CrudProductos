import { useState } from "react";
import { Form, Button, FormGroup, FormLabel } from "react-bootstrap";
import { validarCategoria } from "../../helpers/validaciones";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";

const CrearProducto = () => {
  //Los productos van a tener las siguientes prop,
  //titulo, descripcion y categoria; de fondo, ademas va a tener un identificador unico (id hecha por una biblioteca luego incorporada).
  /* const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); */
  const ProductoSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "min 4 caracteres")
      .max(20, "max 20 caracteres")
      .required("El titulo es requerido"),
    description: Yup.string()
      .min(4)
      .max(200)
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
    },
  });

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Desde Submit');
    const nuevoProducto={
      titulo: title,
      descripcion: description,
      categoria: category,
    };
    console.log("###Nuevo Producto-->", nuevoProducto);
  };*/

  return (
    <div className="container py-3 my-3">
      <div className="text-center">
        <h2>Crear Producto</h2>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el titulo del producto"
            minLength={4}
            maxLength={25}
            /*value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}*/
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
            /*value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}*/
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
            /*</FormGroup>value={category}
            onChange={(e) => {
              let resultado=validarCategoria(e.currentTarget.value);
              console.log('resultado de validar', resultado);

              setCategory(e.currentTarget.value);
            }}
            className={clsx("form-select", 
            {
              "is-valid": validarCategoria(category)
            },
            {
              "is-invalid": !validarCategoria(category)
            })}*/
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
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default CrearProducto;
