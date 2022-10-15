import React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { useTodo } from '../../../contexts/TodoContext'
import Item from '../Item'

export default function List({ username }) {
  const { todoList } = useTodo()
  return (
    <>
      <Card>
        <ListGroup className="custom-list-group-main-page">
          {todoList.map((todoItem) => {
            return (
              <React.Fragment key={todoItem.id}>
                <Item currentItem={todoItem} username={username} />
              </React.Fragment>
            )
          })}
        </ListGroup>
      </Card>
    </>
  )
}
