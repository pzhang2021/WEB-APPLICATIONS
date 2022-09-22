import React, { createContext, useContext, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
const TodoContext = createContext()

export function useTodo() {
  return useContext(TodoContext)
}

export default function TodoProvider({ children }) {
  const todoListDataTemplate = [
    {
      id: 1,
      title: 'Eating',
      description: 'hahahaha1',
      isDone: false,
      time: ['Thu', 18, 32],
    },
    {
      id: 2,
      title: 'Fishing',
      description: 'hahahaha2',
      isDone: false,
      time: ['Fri', 3, 22],
    },
    {
      id: 3,
      title: 'Sleeping',
      description: 'hahahaha3',
      isDone: true,
      time: ['Thu', 8, 35],
    },
    {
      id: 4,
      title: 'Shopping',
      description: 'eggs, pork meat, onion, strawberry',
      isDone: false,
      time: ['Thu', 18, 32],
    },
  ]
  // get todo data from mongodb
  const [todoListData, setTodoListData] = useState(todoListDataTemplate)

  // add todo
  const addTodo = (title, description) => {
    // randomly generate id
    const id = nanoid()
    // get current time
    const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const current = new Date()
    const time = [
      weeks[current.getDay()],
      current.getHours(),
      current.getMinutes(),
    ]
    setTodoListData((prevData) => [
      { id, title, description, isDone: false, time },
      ...prevData,
    ])
    console.log(time)
  }

  const value = { todoListData, addTodo }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
