import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";
import { Button, Modal, Form } from "react-bootstrap";

const Registrar = ({ isOpenRegis, handleCloseRegis }) => {
  const API = import.meta.env.VITE_API;

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${API}/`, values);
      if (response.status === 201) {
        SaveAuth(response.data);
        setCurrentUser(response.data);
        formik.resetForm();
        handleCloseRegis();
      }
    } catch (error) {
      alert(`${error.response.data.message}`);
      console.error(error);
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato invalido")
      .min(7)
      .max(128)
      .required("El email es requerido"),
    password: Yup.string()
      .min(7)
      .max(128)
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("La contraseña es requerida"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: {validationSchema},
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: {onSubmit}
  })

  return (
    <>
      <Modal show={isOpenRegis} onHide={handleCloseRegis}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmitRegis} >
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                name="email"
                {...formik.getFieldProps("email")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.email && formik.errors.email,
                  },
                  {
                    "is-valid": formik.touched.email && !formik.errors.email,
                  }
                )}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                name="password"
                {...formik.getFieldProps("password")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                  },
                  {
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repita su contraseña"
                name="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                  },
                  {
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              )}
            </Form.Group>
            <div>
              <Button variant="primary" type="submit" className="mx-2">
                Registrarme
              </Button>
              <Button
                variant="secondary"
                onClick={handleCloseRegis}
                className="mx-2"
              >
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Registrar;
