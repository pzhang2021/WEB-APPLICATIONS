import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    signOut(auth)
  }

  // Existing and future Auth states are now persisted in the current
  // session only. Closing the window would clear any existing state even
  // if a user forgets to sign out.
  // ...
  // New sign-in will be persisted with session persistence.
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return
    })
    .catch((error) => {
      console.log(error.message)
    })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // if (authUser) {
      //   console.log('user sign in')
      // } else {
      //   console.log('user sign out')
      // }
      setCurrentUser(authUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    createUser,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
