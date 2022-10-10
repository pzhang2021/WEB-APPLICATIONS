import React, {
  createContext,
  useContext,
  useState,
  useReducer,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

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
  return { id: uuidv4(), username: username, email: email, password: password }
}

export default function AuthProvider({ children }) {
  const [userList, dispatch] = useReducer(reducer, [])
  const [currentUser, setCurrentUser] = useState('')

  const createUser = (username, email, password) => {
    const userIsExist = userList.some((user) => user.email === email)
    if (userIsExist) return false
    dispatch({
      type: ACTIONS.ADD_USER,
      payload: { username, email, password },
    })
    setCurrentUser(username)
    return true
  }

  const login = (email, password) => {
    const userIsExist = userList.some((user) => user.email === email)
    if (!userIsExist) return { type: false, message: 'Email does not exist' }
    const userCheck = userList.find(
      (user) => user.email === email && user.password === password
    )
    if (!userCheck)
      return { type: false, message: 'Email or password is incorrect' }

    setCurrentUser(userCheck.username)
    return { type: true, message: 'Login Successfully' }
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
