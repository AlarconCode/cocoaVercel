
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

export const createProductRequest = async (product, token) => {

  const options = {
    method: 'POST',
    body: product,
    credentials: 'include',
    headers: { 
      'Authorization': token
    }
  }

  try {
    console.log('createToken', token)
    const res = await fetch(`${url}product`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}

export const updateProductRequest = async (product, token) => {

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

export const deleteProductRequest = async (id, token) => {
  
  const options = {
    method: 'DELETE',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token,
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

export const uploadImageRequest = async (file, token) => {

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