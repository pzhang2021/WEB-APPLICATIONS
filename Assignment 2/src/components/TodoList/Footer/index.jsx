import React, { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { Card, Button } from 'react-bootstrap'
import './index.scss'

export default function Footer() {
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleLogout = async () => {
    setError('')
    try {
      // await logout()
      navigate('/login')
    } catch {
      setError('Logout Error')
    }
  }
  return (
    <div className="logout-btn mt-4">
      <Button variant="dark" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  )
}
