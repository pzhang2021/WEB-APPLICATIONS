import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const TodoContext = createContext()

export function useTodo() {
  return useContext(TodoContext)
}

const ACTIONS = {
  FETCH_DATA: 'fetchData',
}

const reducer = (todoList, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_DATA:
      return action.payload
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
  const [todoList, dispatch] = useReducer(reducer, [])

  const requestTime = () => {
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const current = new Date()
    const time = {
      Day: weeks[current.getDay()],
      Hour: current.getHours(),
      Minute: current.getMinutes(),
    }
    return time
  }

  // get list data corresponding to its ID
  const getItem = (itemID) => {
    const selectedItem = todoList.filter((item) => item.todoId === itemID)
    return selectedItem[0]
  }

  // general ajax function
  const ajax = async (url, method, params) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios({
      method,
      url,
      data: params,
      ...config,
    })
    return response
  }

  const fetchData = () => {
    const url = 'http://localhost:4000/todo/list'
    ajax(url, 'get').then((response) => {
      const res = response.data
      dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data })
    })
  }
  // render todo list from fetched data through useEffect
  useEffect(() => {
    fetchData()
  }, [])

  // add todo
  const addTodo = async (title, description, author, isUrgent) => {
    // get current time
    const time = requestTime()
    const newData = {
      title,
      description,
      isDone: false,
      time,
      author,
      isUrgent: isUrgent,
    }
    const url = 'http://localhost:4000/todo/add'
    const response = await ajax(url, 'post', newData)
    const res = response.data
    dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data })
  }

  const updateItem = async (itemID, title, description, isDone) => {
    const url = 'http://localhost:4000/todo/edit'
    const time = requestTime()
    const params = {
      todoId: itemID,
      title,
      description,
      time,
      isDone,
    }
    const response = await ajax(url, 'post', params)
    const res = response.data
    dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data })
  }

  const deleteItem = async (itemID) => {
    const url = `http://localhost:4000/todo/delete/${itemID}`
    const response = await ajax(url, 'delete')
    const res = response.data
    dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data })
  }

  const clearTask = async () => {
    const url = `http://localhost:4000/todo/clear`
    const response = await ajax(url, 'post')
    const res = response.data
    dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data })
  }

  const clearAll = async () => {
    const url = 'http://localhost:4000/todo/reset'
    const response = await ajax(url, 'delete')
    const res = response.data
    dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data })
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
