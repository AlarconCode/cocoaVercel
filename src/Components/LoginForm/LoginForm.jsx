import { ErrorMessage, Field, Formik } from "formik"
import { useAuth } from '../../context/AuthContext'
import * as Yup from 'yup';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const initialValues = {
  email: '',
  password: '',
} 

const validationSchema = Yup.object({
  email: Yup.string().email('Introduce un email válido').required('Campo requerido'),
  password: Yup.string().min(8,'Debe tener 8 o más caracteres').required('Campo requerido')
})


// Formulario con Componentes Formik Contexto
export const LoginForm = () => {
  
  const {login, isLogin, error} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogin) navigate('/')
  }, [isLogin])  
  
  const onSubmit = async (values) => {
    login(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <h1 className="titleRegisterForm">Login</h1>
          {
            error ? <div className="errorMessage">{error}</div> : null
          }
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field name='email' type='email' />
            <ErrorMessage name="email" component='span' />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <Field name='password' type='password' />
            <ErrorMessage name="password" component='span' />
          </div>
          <button 
            type="submit"
            className="buttonForm">
              Entrar
          </button>
          <p>¿No tienes cuenta? <Link to='/registro'>Regístrate</Link></p>
      </form>
      )}
    </Formik> 
  )


}