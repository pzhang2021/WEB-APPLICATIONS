import React, { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useTodo } from '../../../contexts/TodoContext'
import { Form, Stack, Button, Card, Collapse } from 'react-bootstrap'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import './index.scss'

export default function Header() {
  const { addTodo } = useTodo()
  const [open, setOpen] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="mb-4">
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
      <Collapse in={open}>
        <div id="collapse-content">
          <Card>
            <div className="m-2">
              <Stack direction="horizontal" gap={2} className="mb-2">
                <Form.Control
                  className="me-auto"
                  placeholder="Title"
                  required
                />
                <div className="vr" />
                <Button variant="outline-danger">Reset</Button>
              </Stack>
              <Stack direction="horizontal" gap={2} className="mb-2">
                <Form.Control className="me-auto" placeholder="Description" />
                <div className="vr" />
                <Button variant="outline-danger">Reset</Button>
              </Stack>
              <div className="addTodo mt-2">
                <Button className="m-2 addTodo-btn" variant="dark">
                  Submit Task
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Collapse>
    </div>
  )
}
