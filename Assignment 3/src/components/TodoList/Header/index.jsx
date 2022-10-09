import React from 'react'
import { Button } from 'react-bootstrap'
import { useTodo } from '../../../contexts/TodoContext'

export default function Header({ username }) {
  const { clearAll } = useTodo()
  const handleReset = async (e) => {
    e.preventDefault()
    try {
      await clearAll()
    } catch (error) {}
  }
  return (
    <div className="m-2 mb-4">
      Hello, {username}
      <Button
        variant="outline-danger"
        className="mb-2 custom-reset-btn"
        onClick={handleReset}
      >
        Reset
      </Button>
    </div>
  )
}
