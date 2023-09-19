
import { FaArrowUp } from "react-icons/fa6";

function Main ({data, category}) {
  
  return (
    <main>
      <div id={category} className="space"></div>
      <h1>{category}</h1>

      {data.map((product, index) => (
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