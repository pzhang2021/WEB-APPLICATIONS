import React, { createContext, useContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

const TodoContext = createContext()

export function useTodo() {
  return useContext(TodoContext)
}
const ACTIONS = {
  ADD_ITEM: 'addItem',
  UPDATE_ITEM: 'updateItem',
  DELETE_ITEM: 'deleteItem',
  CLEAR_ALL_ITEMS: 'clearAllItems',
  CLEAR_COMPLETED_ITEMS: 'clearCompletedItem',
}
const reducer = (todoList, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      return [...todoList, action.payload.data]
    case ACTIONS.UPDATE_ITEM:
      return todoList.map((item) => {
        if (item.id === action.payload.itemID) {
          return {
            ...item,
            title: action.payload.title,
            description: action.payload.description,
            isDone: action.payload.isDone,
          }
        }
        return item
      })
    case ACTIONS.DELETE_ITEM:
      return todoList.filter((item) => {
        if (item.id !== action.payload.itemID) {
          return item
        }
        return false
      })
    case ACTIONS.CLEAR_COMPLETED_ITEMS:
      return todoList.filter((item) => {
        if (!item.isDone || item.author !== action.payload.username) {
          return item
        }
        return false
      })
    case ACTIONS.CLEAR_ALL_ITEMS:
      return todoList.filter((item) => {
        if (item.author !== action.payload.username) {
          return item
        }
        return false
      })
    default:
      return todoList
  }
}

export default function TodoProvider({ children }) {
  // example of local dummy data
  const todoListDataTemplate = [
    {
      id: uuidv4(),
      title: 'Important',
      description: 'You do not have permission to edit others list',
      isDone: false,
      time: ['Thu', 20, 20],
      author: 'Pengju',
      isUrgent: true,
    },
    {
      id: uuidv4(),
      title: 'Tip',
      description:
        'You can register as other users (by using their username) to access it',
      isDone: true,
      time: ['Thu', 19, 11],
      author: 'Pengju',
      isUrgent: false,
    },
    {
      id: uuidv4(),
      title: 'Shopping',
      description: 'eggs, pork meat, onion, strawberry',
      isDone: false,
      time: ['Thu', 18, 32],
      author: 'Pengju',
      isUrgent: false,
    },
  ]
  const [todoList, dispatch] = useReducer(reducer, todoListDataTemplate)

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
  const addTodo = async (title, description, author, isUrgent) => {
    // get current time
    const time = requestTime()
    const newData = {
      id: uuidv4(),
      title,
      description,
      isDone: false,
      time,
      author,
      isUrgent: isUrgent,
    }
    await dispatch({ type: ACTIONS.ADD_ITEM, payload: { data: newData } })
  }

  // get list data corresponding to its ID
  const getItem = (itemID) => {
    const selectedItem = todoList.filter((item) => item.id === itemID)
    return selectedItem[0]
  }

  const updateItem = async (itemID, title, description, isDone) => {
    await dispatch({
      type: ACTIONS.UPDATE_ITEM,
      payload: { itemID, title, description, isDone },
    })
  }

  const deleteItem = async (itemID) => {
    await dispatch({
      type: ACTIONS.DELETE_ITEM,
      payload: { itemID: itemID },
    })
  }

  const clearTask = async (username) => {
    await dispatch({
      type: ACTIONS.CLEAR_COMPLETED_ITEMS,
      payload: { username: username },
    })
  }

  const clearAll = async (username) => {
    await dispatch({
      type: ACTIONS.CLEAR_ALL_ITEMS,
      payload: { username: username },
    })
  }

  const value = {
    todoList,
    addTodo,
    getItem,
    updateItem,
    deleteItem,
    clearTask,
    clearAll,
  }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
