import { ErrorMessage, Field, Formik } from "formik";
import { useAuth } from "../../context/AuthContext";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Introduce un email válido")
    .required("Campo requerido"),
  password: Yup.string()
    .min(8, "Debe tener 8 o más caracteres")
    .required("Campo requerido"),
});

// Formulario con Componentes Formik Contexto
export const LoginForm = () => {
  const { login, isLogin, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin, navigate]);

  const onSubmit = async (values) => {
    try {
      await login(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h1 className="titleRegisterForm">Login</h1>
          {error ? <div className="errorMessage">{error}</div> : null}
          <div className="form-control">
            <StyledInput name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="span" />
          </div>
          <div className="form-control">
            <StyledInput name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="span" />
          </div>
          <button type="submit" className="buttonForm">
            Entrar
          </button>
          <p>
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </StyledForm>
      )}
    </Formik>
  );
};

export const StyledForm = styled.form`
  background-color: var(--secondary);
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
  row-gap: .5rem;

  .form-control {
    width: 75vw;
    max-width: 350px;
    margin-bottom: 1rem;
  }

  .form-control label {
    display: block;
    color: var(--primary);
    margin-bottom: 5px;
  }
`;

export const StyledInput = styled(Field)`
  display: block;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  background-color: aliceblue;
  font-size: 1rem;
  color: var(--primary);
  border: 2px solid var(--primary);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;
