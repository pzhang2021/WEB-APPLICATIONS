import React, { useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  Form,
  ButtonGroup,
  Button,
  Card,
  Alert,
  FloatingLabel,
} from 'react-bootstrap'
import { FaFacebook, FaGoogle, FaTwitter, FaGithub } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useAuth } from '../../contexts/AuthContext'
import md5 from 'md5'

export default function Login() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  if (localStorage.getItem('token')) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      const loginInfo = await login(
        emailRef.current.value,
        md5(passwordRef.current.value)
      )
      if (!loginInfo.type) {
        setError(loginInfo.message)
      }
    } catch {
      setError('Connection error')
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
            <Form.Group id="email" className="m-2">
              <FloatingLabel
                controlId="login-email"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@depaul.edu"
                  ref={emailRef}
                  required
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
            <Form.Group id="password" className="m-2">
              <FloatingLabel
                controlId="login-password"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </FloatingLabel>
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
      <IconContext.Provider
        value={{ color: 'black', className: 'global-class-name' }}
      >
        <div className="text-center m-2">
          <ButtonGroup onClick={handleThirdPartyLogin}>
            <Button
              className="btn-link btn-floating"
              variant="light"
              type="button"
            >
              <FaGithub />
            </Button>
            <Button
              className="btn-link btn-floating"
              variant="light"
              type="button"
            >
              <FaGoogle />
            </Button>
            <Button
              className="btn-link btn-floating"
              variant="light"
              type="button"
            >
              <FaTwitter />
            </Button>
            <Button
              className="btn-link btn-floating"
              variant="light"
              type="button"
            >
              <FaFacebook />
            </Button>
          </ButtonGroup>
        </div>
      </IconContext.Provider>
      <div className="copyright mb-2">
        DePaul University CSC 436 &copy; 2022 Created by&nbsp;
        <a href="https://github.com/Inupedia">Inupedia</a>
      </div>
    </>
  )
}
