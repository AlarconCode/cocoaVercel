const url = `http://localhost:4000/api/`

export let token = null
export const setToken = newToken => {token = `Bearer ${newToken}` }

export const getProductRequest = async (id) => {

  try {
    
    const res = await fetch(`${url}product/${id}`)
    const data = await res.json()    
    return data

  } catch (error) {
    console.log(error);
  }

}

export const getProductsRequest = async () => {

  try {
    
    const res = await fetch(`${url}products`)
    const data = await res.json()    
    return data

  } catch (error) {
    console.log(error);
  }

}

export const createProductRequest = async (product) => {

  const options = {
    method: 'POST',
    body: JSON.stringify(product),
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/json'
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
    body: JSON.stringify(product),
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }

  try {
    
    const res = await fetch(`${url}product/${product._id}`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}

export const deleteProductRequest = async (id) => {
  
  const options = {
    method: 'DELETE',
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