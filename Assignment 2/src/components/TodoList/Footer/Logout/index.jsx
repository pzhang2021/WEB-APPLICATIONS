import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import { Button } from 'react-bootstrap'

export default function Footer() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <Button className="logout-btn" variant="dark" onClick={handleLogout}>
      Log Out
    </Button>
  )
}
