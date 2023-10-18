import { createContext, useContext, useEffect, useState } from "react";
import { getProductsRequest, getProductRequest, createProductRequest, updateProductRequest, deleteProductRequest } from "../services/product.services";
import { useAuth } from "./AuthContext";

export const ProductContext = createContext()

export const useProduct = () => {
  const context = useContext(ProductContext)
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 

export const ProductProvider = ({children}) => {
  const [productList, setProductList] = useState()
  const {logout} = useAuth()

  const getSingleProduct = async (id) => {
    try {
      
      const product = await getProductRequest(id)
      return product

    } catch (error) {
      console.log(error);
    }
  }

  const getProducts = async (cat) => {
    try {
      
      const products = await getProductsRequest(cat)
      return products

    } catch (error) {
      console.log(error);
    }
  }

  const createProduct = async (product) => {

    try {
      
      const res = await createProductRequest(product)
      if (res.message === 'jwt expired') {
        logout()
      }
      console.log(res);

    } catch (error) {

      console.log(error);
    }
  }

  const updateProduct = async (product) => {
    
    try {
      const res = await updateProductRequest(product)
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  
  }

  const deleteProduct = async (id) => {

    try {
      
      const res = await deleteProductRequest(id)
      console.log(res);
      return res

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        getSingleProduct,
        createProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )

}