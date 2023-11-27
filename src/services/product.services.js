import {getCookie} from './user.services'
const token = `Bearer ${getCookie('jwt')}`

const url = import.meta.env.VITE_BASE_URL

export const getProductRequest = async (id) => {

  try {
    
    const res = await fetch(`${url}product/${id}`)
    const data = await res.json()    
    return data

  } catch (error) {
    console.log(error);
  }

}

export const getProductsRequest = async (cat) => {

  try {
    
    const res = await fetch(`${url}products/${cat}`)
    const data = await res.json()    
    return data

  } catch (error) {
    console.log(error);
  }

}

export const createProductRequest = async (product) => {

  const options = {
    method: 'POST',
    body: product,
    credentials: 'include',
    headers: { 
      'Authorization': token
    }
  }

  try {
    
    const res = await fetch(`${url}product`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}

export const updateProductRequest = async (product) => {

  const options = {
    method: 'PUT',
    body: product,
    credentials: 'include',
    headers: { 
      'Authorization': token
    }
  }

  try {
    console.log('updateToken', token);
    const res = await fetch(`${url}product/${product.get('_id')}`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}

export const deleteProductRequest = async (id) => {
  
  const options = {
    method: 'DELETE',
    credentials: 'include',
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }

  try {
    
    const res = await fetch(`${url}product/${id}`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}

export const uploadImageRequest = async (file) => {

  const options = {
    method: 'POST',
    body: file,
    headers: {
      'Authorization': token
    }
  }

  try {
    
    const res = await fetch(`${url}upload`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}