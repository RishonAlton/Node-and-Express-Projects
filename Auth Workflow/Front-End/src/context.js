import axios from 'axios'

import React, { useContext, useState, useEffect } from 'react'


const AppContext = React.createContext()


const AppProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  const saveUser = (user) => {
    setUser(user)
  }

  const removeUser = () => {
    setUser(null)
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/users/showMe`)
      saveUser(data.user)
    } catch (error) {
      removeUser()
    }
    setIsLoading(false)
  }

  const logoutUser = async () => {
    try {
      await axios.delete('/api/auth/logout')
      removeUser()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
    //eslint-disable-next-line
  }, [])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )

}


const useGlobalContext = () => {
  return useContext(AppContext)
}


export { AppProvider, useGlobalContext }
