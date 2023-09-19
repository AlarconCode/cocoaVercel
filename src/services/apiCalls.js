import { useState, useEffect } from "react";

const url = `localhost:4000/carta`

const getProducts = () => {
  const [productList, setProductList] = useState([])
  
  useEffect(() => {
    const fetchList = async () => {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data);    
      setProductList(data)
    }
    
    fetchList()

  }, [])

  return productList

}

export default getProducts