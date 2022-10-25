import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import Footer from './Footer'
import MyList from './List'
import Header from './Header'
import TodoProvider from '../../contexts/TodoContext'

export default function TodoList() {
  const location = useLocation()
  // const currentUser = 'pengju'
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  const currentUser = localStorage.getItem('username')

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
