import React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { useTodo } from '../../../contexts/TodoContext'
import Item from '../Item'

export default function List({ username }) {
  const { todoListData } = useTodo()
  return (
    <>
      <Card>
        <ListGroup className="custom-list-group-main-page">
          {todoListData.map((todoItem) => {
            return (
              <React.Fragment key={todoItem.id}>
                <Item data={todoItem} username={username} />
              </React.Fragment>
            )
          })}
        </ListGroup>
      </Card>
    </>
  )
}
