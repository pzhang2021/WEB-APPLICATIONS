import React, { useState, useRef } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useTodo } from '../../../contexts/TodoContext'
import { Form, Stack, Button, Card, Collapse } from 'react-bootstrap'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import Logout from './Logout'

export default function Header() {
  const { addTodo } = useTodo()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(descriptionRef.current.value)
    try {
      setLoading(true)
      await addTodo(titleRef.current.value, descriptionRef.current.value)
    } catch (e) {
      console.log(e.message)
    }
    setLoading(false)
  }
  return (
    <div className="m-2 mt-4">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="collapse-content"
        aria-expanded={open}
        variant="dark"
        className="mb-2"
      >
        <IconContext.Provider
          value={{ color: 'white', className: 'global-class-name' }}
        >
          {open ? <FaMinus /> : <FaPlus />}
        </IconContext.Provider>
      </Button>
      <Logout />
      <Collapse in={open}>
        <div id="collapse-content">
          <Card>
            <Form className="m-2" onSubmit={handleSubmit}>
              <Stack direction="horizontal" gap={2} className="mb-2">
                <Form.Control
                  ref={titleRef}
                  className="me-auto"
                  placeholder="Title"
                  required
                />
                <div className="vr" />
                <Button variant="outline-danger">Reset</Button>
              </Stack>
              <Stack direction="horizontal" gap={2} className="mb-2">
                <Form.Control
                  ref={descriptionRef}
                  className="me-auto"
                  placeholder="Description"
                />
                <div className="vr" />
                <Button variant="outline-danger">Reset</Button>
              </Stack>
              <div className="addTodo mt-2">
                <Button
                  disabled={loading}
                  className="m-2 addTodo-btn"
                  variant="dark"
                  type="submit"
                >
                  Submit Task
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Collapse>
    </div>
  )
}
