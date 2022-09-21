import React, { createContext, useContext, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
const TodoContext = createContext()

export function useTodo() {
  return useContext(TodoContext)
}

export default function TodoProvider({ children }) {
  const todoListDataTemplate = [
    { id: 1, title: 'Eating', description: 'hahahaha1', isDone: false },
    { id: 2, title: 'Fishing', description: 'hahahaha2', isDone: false },
    { id: 3, title: 'Sleeping', description: 'hahahaha3', isDone: true },
    { id: 4, title: 'Shopping', description: 'hahahaha4', isDone: false },
  ]
  // get todo data from mongodb
  const [todoListData, setTodoListData] = useState(todoListDataTemplate)

  // add todo
  const addTodo = (title, description, isDone) => {
    // randomly generate id
    const id = nanoid()
    setTodoListData((prevData) => [
      { id, title, description, isDone },
      ...prevData,
    ])
  }

  const value = { todoListData }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
