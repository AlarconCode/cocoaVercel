
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

function Main ({category}) {
  const url = `http://localhost:4000/carta`
  const [productList, setProductList] = useState([])
  const [body, setBody] = useState()
  
  useEffect(() => {
    const fetchList = async () => {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data);    
      setProductList(data)
    }
    
    fetchList()

  }, [])
  
  return (
    <main>
      <div id={category} className="space"></div>
      <h1>{category}</h1>

      {productList.map((product, index) => (
        category === product.cat ? 
        <div key={product.id} className='product-container'>
          <h3 className='desc'>{product.desc}</h3>
          <p>{ product.ingredientes }</p>
          <h3 className='price'>{product.price}</h3>
        </div> :
        null
      ))}
      <a href="#Desayunos Básicos"><div className='up'><FaArrowUp /></div></a>

    </main>
  )
}

export default Main