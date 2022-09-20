import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, ButtonGroup, Button, Card, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faFacebook,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import './index.scss'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(username)

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/', { replace: true, state: { currentUserIs: username } })
    } catch {
      setError('Email or password is incorrect')
    }
    setLoading(false)
  }

  const handleThirdPartyLogin = (e) => {
    e.preventDefault()
    setError('Work in progress')
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group
              id="email"
              className="m-2"
              onChange={(e) => setUsername(e.target.value)}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
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
            <div className="m-2 mt-4" style={{ maxWidth: '50vh' }}>
              <Button
                disabled={loading}
                className="w-100 custom-button"
                type="submit"
              >
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Need an account? &nbsp;
        <Link to="/signup">Sign up</Link>
      </div>
      <div className="line"></div>
      <div className="text-center m-2">
        <ButtonGroup onClick={handleThirdPartyLogin}>
          <Button
            className="btn-link btn-floating"
            variant="light"
            type="button"
          >
            <FontAwesomeIcon icon={faFacebook} color="black" />
          </Button>
          <Button
            className="btn-link btn-floating"
            variant="light"
            type="button"
          >
            <FontAwesomeIcon icon={faTwitter} color="black" />
          </Button>
          <Button
            className="btn-link btn-floating"
            variant="light"
            type="button"
          >
            <FontAwesomeIcon icon={faGoogle} color="black" />
          </Button>
          <Button
            className="btn-link btn-floating"
            variant="light"
            type="button"
          >
            <FontAwesomeIcon icon={faGithub} color="black" />
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}
