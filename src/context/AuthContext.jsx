import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest } from "../services/user.services";

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

        setUser(res.userLogin)
        setIsLogin(true)
      
      } else {
      
        setError(res.message)
        console.log(error);
      
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        user,
        isLogin,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}
