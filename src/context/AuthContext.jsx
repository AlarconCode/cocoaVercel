import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, logoutRequest } from "../services/user.services";
import { setToken } from "../services/product.services";

export const AuthContext = createContext()

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
    try {
      
      const res = await loginRequest(values)
      if (!res.error) {
        
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(res)
        )
        setUser(res.user)
        setToken(res.token)
        setIsLogin(true)
      
      } else {
      
        setError(res.message)
        console.log(error);
      
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      setUser(userLogged.user)
      setToken(userLogged.token)
      setIsLogin(true)
    }
  }, [])
  
  
  const logout = async () => {
    
    try {

      const res = await logoutRequest()
      console.log(res);
      setUser(null)
      setToken(null)
      setIsLogin(false)
      window.localStorage.clear()

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
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}
