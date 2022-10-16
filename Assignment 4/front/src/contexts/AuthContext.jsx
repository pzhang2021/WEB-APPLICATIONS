import React, { createContext, useContext, useState, useReducer } from 'react'
import axios from 'axios'
import url from '../config/url'
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

const ACTIONS = {
  ADD_USER: 'addUser',
  DELETE_USER: 'deleteUser',
}

const reducer = (userList, action) => {
  switch (action.type) {
    case ACTIONS.ADD_USER:
      return [
        ...userList,
        createUser(
          action.payload.username,
          action.payload.email,
          action.payload.password
        ),
      ]
    case ACTIONS.DELETE_USER:
      return userList
    default:
      return userList
  }
}

const createUser = (username, email, password) => {
  return { username: username, email: email, password: password }
}

export default function AuthProvider({ children }) {
  const [userList, dispatch] = useReducer(reducer, [])
  const [currentUser, setCurrentUser] = useState('')
  const [authData, setAuthData] = useState('')

  const createUser = (username, email, password) => {
    axios
      .post(url.authUrl + '/auth/signup', { username, email, password })
      .then((response) => {
        setAuthData(response.data)
      })
    if (authData.status === 1) return { type: false, message: authData.error }
    else {
      setCurrentUser(authData.username)
      return { type: true, message: 'Login Successfully' }
    }
  }

  const login = (email, password) => {
    axios
      .post(url.authUrl + '/auth/login', { email, password })
      .then((response) => {
        setAuthData(response.data)
      })
    if (authData.status === 1) return { type: false, message: authData.error }
    else {
      setCurrentUser(authData.username)
      return { type: true, message: 'Login Successfully' }
    }
  }

  const logout = () => {
    setCurrentUser('')
  }

  const value = {
    currentUser,
    createUser,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
