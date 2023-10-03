const url = `http://localhost:4000/api/`

export const getProductsRequest = async () => {
  const res = await fetch(`${url}products`)
  const data = await res.json()    
  return data
}