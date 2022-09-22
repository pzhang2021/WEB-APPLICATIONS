import React, { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'
const TodoContext = createContext()

export function useTodo() {
  return useContext(TodoContext)
}

export default function TodoProvider({ children }) {
  const todoListDataTemplate = [
    {
      id: nanoid(),
      title: 'Shopping',
      description: 'eggs, pork meat, onion, strawberry',
      isDone: false,
      time: ['Thu', 18, 32],
      author: 'Inupedia',
      isUrgent: false,
    },
  ]
  // get todo data from mongodb
  const [todoListData, setTodoListData] = useState(todoListDataTemplate)

  const requestTime = () => {
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const current = new Date()
    const time = [
      weeks[current.getDay()],
      current.getHours(),
      current.getMinutes(),
    ]
    return time
  }
  // add todo
  const addTodo = (title, description, author, isUrgent) => {
    // randomly generate id
    const id = nanoid()
    // get current time
    const time = requestTime()
    setTodoListData((prevData) => [
      {
        id,
        title,
        description,
        isDone: false,
        time,
        author,
        isUrgent: isUrgent,
      },
      ...prevData,
    ])
    console.log(todoListData)
  }

  // get list data corresponding to its ID
  const getItem = (itemId) => {
    const selectedList = todoListData.filter((item) => item.id === itemId)
    return selectedList[0]
  }

  const saveItem = (itemID, title, description) => {
    const modifiedData = todoListData.map((item) => {
      if (item.id === itemID) {
        return {
          id: item.id,
          title: title,
          description: description,
          isDone: item.isDone,
          time: item.time,
          author: item.author,
          isUrgent: item.isUrgent,
        }
      } else return item
    })
    setTodoListData(modifiedData)
  }

  const doneTask = (itemID) => {
    const time = requestTime()
    const modifiedData = todoListData.map((item) => {
      if (item.id === itemID) {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          isDone: true,
          time: time,
          author: item.author,
          isUrgent: false,
        }
      } else return item
    })
    setTodoListData(modifiedData)
  }

  const clearTask = () => {
    const modifiedData = todoListData.filter((item) => {
      if (item.isDone === false) {
        return item
      }
    })
    setTodoListData(modifiedData)
  }

  const value = {
    todoListData,
    addTodo,
    getItem,
    saveItem,
    doneTask,
    clearTask,
  }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
