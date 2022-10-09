import React, { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import {
  collection,
  deleteDoc,
  setDoc,
  updateDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore'
const TodoContext = createContext()

export function useTodo() {
  return useContext(TodoContext)
}

export default function TodoProvider({ children }) {
  const userRef = collection(db, 'users')
  // example of local dummy data
  // const todoListDataTemplate = [
  //   {
  //     id: '0',
  //     title: 'Shopping',
  //     description: 'eggs, pork meat, onion, strawberry',
  //     isDone: false,
  //     time: ['Thu', 18, 32],
  //     author: 'Mom',
  //     isUrgent: false,
  //   },
  // ]
  const [todoListData, setTodoListData] = useState([])
  // get todo data from firebase
  useEffect(() => {
    const unsub = onSnapshot(userRef, (snapShot) => {
      let temp = []
      try {
        snapShot.docs.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() })
        })
      } catch (error) {
        console.log(error)
      }
      setTodoListData(temp)
    })
    return unsub
  }, [])

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
      title,
      description,
      isDone: false,
      time,
      author,
      isUrgent: isUrgent,
    }
    await setDoc(doc(userRef), newData)
  }

  // get list data corresponding to its ID
  const getItem = (itemID) => {
    const selectedList = todoListData.filter((item) => item.id === itemID)
    return selectedList[0]
  }

  const saveItem = (itemID, title, description) => {
    todoListData.map((item) => {
      if (item.id === itemID) {
        const newItem = {
          title: title,
          description: description,
        }
        try {
          updateItem(item.id, newItem)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const doneTask = (itemID) => {
    const time = requestTime()
    todoListData.map((item) => {
      if (item.id === itemID) {
        const newItem = {
          isDone: true,
          time: time,
          isUrgent: false,
        }
        try {
          updateItem(item.id, newItem)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const updateItem = async (id, newItem) => {
    await updateDoc(doc(db, 'users', id), newItem)
  }

  const clearTask = async () => {
    todoListData.filter((item) => {
      if (item.isDone && item.author === sessionStorage.getItem('username')) {
        try {
          deleteItem(item)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  // eslint-disable-next-line
  const clearAll = () => {
    todoListData.filter((item) => {
      if (item.author === sessionStorage.getItem('username')) {
        try {
          deleteItem(item)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const deleteItem = async (item) => {
    await deleteDoc(doc(db, 'users', item.id))
  }

  const value = {
    todoListData,
    addTodo,
    getItem,
    saveItem,
    doneTask,
    clearTask,
    clearAll,
  }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
