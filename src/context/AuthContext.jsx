import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, logoutRequest } from "../services/user.services";
import { setToken } from "../services/product.services";
import { node } from "prop-types";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] =  useState('')
  const [cookies] = useCookies()
  const navigate = useNavigate()

  const register = async (user) => {
    try {

      const res = await registerRequest(user)
      if (!res.error) {

        setUser(res.newUser)
        setIsLogin(true)
      
      } else {

        setError(res.message)
        console.log(error);

      } 

    } catch (error) {
      console.error(error);
    }
  }

  const login = async (values) => {
    
    if (cookies.jwt) {
      navigate('/')
    }

    try {
      
      const res = await loginRequest(values)
      if (!res.error) {
        setUser(res.user)
        setIsLogin(true)
        setToken(cookies.jwt)
      } else {
      
        setError(res.message)
        console.log(error);
      
      }

    } catch (error) {
      console.log(error);
    }
  }
  
  
  const logout = async () => {
    
    try {

      const res = await logoutRequest()
      console.log(res);
      setUser(null)
      setToken(null)
      setIsLogin(false)

    } catch (error) {
      console.log(error);  
    }

  }

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        user,
        isLogin,
        setIsLogin,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

AuthProvider.propTypes ={
  children: node
}
