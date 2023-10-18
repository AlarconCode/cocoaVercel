import { ErrorMessage, Field, Formik, useFormik } from "formik"
import { useAuth } from '../../context/AuthContext'
import '../../app.css'
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import Swal from "sweetalert2";


const initialValues = {
  cat: '',
  desc: '',
  ingredientes: '',
  price: '',
  img: ''
}

const validationSchema = Yup.object({
  cat: Yup.string().required('Campo requerido'),
  desc: Yup.string().max(255,'Debe tener menos caracteres'),
  ingredientes: Yup.string().max(255,'Debe tener menos caracteres'),
  price: Yup.string().required('precio requerido'),
  img: Yup.string()
})


// Formulario con Componentes Formik Contexto
export const ProductForm = ({...props}) => {  
  const {isLogin, error} = useAuth()
  const [values, setValues] = useState(null)
  const { createProduct, getSingleProduct, updateProduct } = useProduct()
  const params = useParams()
  const navigate = useNavigate()

  const onSubmitCreateProduct = (values) => {
    Swal.fire({
      title: `Añadir ${values.desc}`,
      icon: 'info',
      confirmButtonColor: 'green',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'red'
    }).then(res => {
      if(res.isConfirmed) {
        createProduct(values)
        Swal.fire({
          icon: 'success',
          title: `${values.desc} Añadida`,
          timer: 2000,
          showConfirmButton: false
        })
        setTimeout(() => {
          navigate(`/${values.cat}`)
        }, 2000)
      }
      if(res.isDismissed) {
 
        onSubmitProps.setSubmitting(false)
        
      }
    })
  }
 
  const onSubmitUpdateProduct = (values, onSubmitProps) => {
    Swal.fire({
      title: '¿Actualizar?',
      icon: 'info',
      confirmButtonColor: 'green',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'red'
    }).then(res => {
      if(res.isConfirmed) {
        updateProduct(values)
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          timer: 2000,
          showConfirmButton: false
        })
        setTimeout(() => {
          navigate(-1)
        }, 2000)
      }
      if(res.isDismissed) {
 
        onSubmitProps.setSubmitting(false)
        
      }
    })
  }



  useEffect(() => {
    const getUpdateProduct = async () => {
      if (params.id) {
        const product = await getSingleProduct(params.id)
        setValues(product)
      }
    }
    getUpdateProduct()
  }, [params.id])

  return (
    <Formik
      initialValues={values || initialValues}
      validationSchema={validationSchema}
      onSubmit={!params.id ? onSubmitCreateProduct : onSubmitUpdateProduct}
      enableReinitialize = {true}
      isSubmitting = {false}
    >
      {formik => {
        console.log('formikProps', formik)
        return (
          <form onSubmit={formik.handleSubmit}>
          <h1 className="titleRegisterForm">{props.title}</h1>
          {
            error ? <div className="errorMessage">{error}</div> : null
          }
          <div className="form-control">
            <label htmlFor="cat">Categoría</label>
            <Field as='select' name='cat' type='text'>
              <option value="Desayunos">Desayunos</option>
              <option value="cafes">Cafes</option>
              <option value="Repostería Casera">Repostería Casera</option>
              <option value="Comidas">Comidas</option>
              <option value="Bebidas">Bebidas</option>
            </Field>
            <ErrorMessage name="cat" component='span' />
          </div>
          <div className="form-control">
            <label htmlFor="desc">Descripción</label>
            <Field name='desc' type='text' />
            <ErrorMessage name="desc" component='span' />
          </div>
          <div className="form-control">
            <label htmlFor="ingredientes">Ingredientes</label>
            <Field name='ingredientes' type='text' />
            <ErrorMessage name="ingredientes" component='span' />
          </div>
          <div className="form-control">
            <label htmlFor="price">Precio</label>
            <Field name='price' type='text' />
            <ErrorMessage name="price" component='span' />
          </div>
          <div className="form-control">
            <label htmlFor="img"></label>
            <Field name='img' type='text' />
            <ErrorMessage name="img" component='span' />
          </div>
          <button 
            type="submit" 
            disabled={!formik.isValid || formik.isSubmitting} 
            style={!formik.isValid || formik.isSubmitting ? {opacity: .5} : {opacity: 1}} 
            className="buttonForm">
              Guardar
          </button>
          <button type='button' className="buttonForm" onClick={()=>{navigate(-1)}}> Atrás</button>
      </form>
        )
      }}
    </Formik> 
  )


}