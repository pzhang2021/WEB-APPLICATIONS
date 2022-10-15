import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Footer from './Footer'
import MyList from './List'
import Header from './Header'
import TodoProvider from '../../contexts/TodoContext'

export default function TodoList() {
  const { currentUser } = useAuth()
  const location = useLocation()
  // const currentUser = 'pengju'
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <TodoProvider>
      <div>
        <Header username={currentUser} />
        <MyList username={currentUser} />
        <Footer username={currentUser} />
      </div>
    </TodoProvider>
  )
}
