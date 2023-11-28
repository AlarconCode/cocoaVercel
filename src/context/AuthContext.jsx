import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, logoutRequest } from "../services/user.services";
import { node } from "prop-types";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function getCookie(name) { 
  const re = new RegExp(name + "=([^;]+)"); 
  const value = re.exec(document.cookie); 
  return (value != null) ? value[1] : null; 
}
let token = null
const setToken = newToken => { token = `Bearer ${newToken}` }


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
  const [error, setError] =  useState([])
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
        setToken(getCookie('jwt'))
        setUser(res.user)
        setIsLogin(true)
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

      const res = await logoutRequest(token)
      console.log(res);
      setUser(null)
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
        error,
        setError,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

AuthProvider.propTypes ={
  children: node
}
