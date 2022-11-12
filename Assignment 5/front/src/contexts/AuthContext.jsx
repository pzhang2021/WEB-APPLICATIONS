import React, { createContext, useContext } from 'react'
import axios from 'axios'
import url from '../config/url'
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  // control token for todo list
  const tokenController = (state, username, token, userID) => {
    if (state) {
      localStorage.setItem('username', username)
      localStorage.setItem('token', token)
      localStorage.setItem('userID', userID)
    } else {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('userID')
    }
  }

  const createUser = async (username, email, password) => {
    const promise = await axios.post(url.authUrl + '/auth/register', {
      username,
      email,
      password,
    })

    if (promise.data.status === 0) {
      tokenController(true, promise.data.username, promise.data.accessToken)
      return { type: true, message: 'Login Successfully' }
    } else {
      return { type: false, message: promise.data.error }
    }
  }

  const login = async (email, password) => {
    const promise = await axios.post(url.authUrl + '/auth/login', {
      email,
      password,
    })
    if (promise.data.status === 0) {
      tokenController(
        true,
        promise.data.username,
        promise.data.accessToken,
        promise.data.userID
      )
      return { type: true, message: 'Login Successfully' }
    } else {
      return { type: false, message: promise.data.error }
    }
  }

  const logout = () => {
    tokenController(false)
  }

  const value = {
    createUser,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
