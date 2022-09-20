import React, { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

export default function TodoList() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  async function handleLogout() {
    setError('')
    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Logout Error')
    }
  }
  return (
    <div>
      <h2>Welcome to pengju's Todo App</h2>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">TodoList</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Body>
      </Card>
      <div>You are login as: {location.state.currentUserIs}</div>
      <div className="w-100 text-center mt-4">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  )
}
