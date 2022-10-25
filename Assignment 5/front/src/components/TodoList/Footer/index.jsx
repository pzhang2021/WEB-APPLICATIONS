import React, { useState, useRef } from 'react'
import { useTodo } from '../../../contexts/TodoContext'
import { Form, Button, Card, Collapse, ToggleButton } from 'react-bootstrap'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import Logout from './Logout'

export default function Footer({ username }) {
  const { addTodo, clearTask } = useTodo()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(descriptionRef.current.value)
    try {
      setLoading(true)
      await addTodo(
        titleRef.current.value,
        descriptionRef.current.value,
        username,
        checked
      )
    } catch (e) {
      console.log(e.message)
    }
    setLoading(false)
  }
  const handleReset = (e) => {
    e.preventDefault()
    try {
      titleRef.current.value = ''
      descriptionRef.current.value = ''
    } catch (error) {}
  }
  const handleClear = async (e) => {
    e.preventDefault()
    try {
      await clearTask()
    } catch (error) {}
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
      <Button
        variant="dark"
        className="mb-2 custom-clear-btn"
        onClick={handleClear}
      >
        Clear Completed Task
      </Button>
      <Logout />
      <Collapse in={open}>
        <div id="collapse-content">
          <Card>
            <Form className="m-2" onSubmit={handleSubmit}>
              <Form.Control
                ref={titleRef}
                className="me-auto mb-2"
                placeholder="Title"
                required
              />
              <Form.Control
                ref={descriptionRef}
                className="me-auto"
                placeholder="Description"
              />
              <div className="foot-btn mt-2">
                <ToggleButton
                  className="custom-toggle-btn"
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-dark"
                  checked={checked}
                  value="1"
                  onChange={(e) => setChecked(e.currentTarget.checked)}
                >
                  Urgent
                </ToggleButton>
                <Button
                  disabled={loading}
                  className="m-2 addTodo-btn"
                  variant="dark"
                  type="submit"
                >
                  Submit Task
                </Button>
                <Button variant="outline-danger" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Collapse>
    </div>
  )
}
