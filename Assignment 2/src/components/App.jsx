import React from 'react'
import Signup from './Signup'
import TodoList from './TodoList'
import Login from './Login'
import { Container } from 'react-bootstrap'
import AuthProvider from '../contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TodoList />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  )
}

export default App
