import React, { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import Footer from './Footer'
import MyList from './List'
import Header from './Header'
import TodoProvider from '../../contexts/TodoContext'

export default function TodoList() {
  // const { currentUser, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  // if (!currentUser) {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }
  const username = location.state.currentUserIs

  return (
    <TodoProvider>
      <div>
        <Header />
        <MyList username={username} />
        <Footer />
      </div>
    </TodoProvider>
  )
}
