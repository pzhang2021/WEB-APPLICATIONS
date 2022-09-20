import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import './index.scss'
import { useAuth } from '../../contexts/AuthContext'

export default function Signup() {
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordConfirmRef = useRef(null)
  const { createUser } = useAuth()
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setError(false)

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError(true)
      setMessage('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      await createUser(emailRef.current.value, passwordRef.current.value)
      setMessage('Create successfully, please ')
    } catch {
      setError(true)
      setMessage('Email already exist')
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{message}</Alert>}
          {!error && message && (
            <Alert variant="success">
              {message} <Link to="/login">login</Link>
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="m-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                ref={usernameRef}
                placeholder="Pengju"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="email" className="m-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="yourID@depual.edu"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password" className="m-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-check" className="m-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <div className="m-2 mt-4" style={{ maxWidth: '50vh' }}>
              <Button
                disabled={loading}
                className="w-100 custom-button"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Already have an account? &nbsp;
        <Link to="/login">Login</Link>
      </div>
    </>
  )
}
