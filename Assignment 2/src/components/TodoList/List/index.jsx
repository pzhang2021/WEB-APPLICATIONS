import React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { useTodo } from '../../../contexts/TodoContext'
import Item from '../Item'
import './index.scss'

export default function List({ username }) {
  const { todoListData } = useTodo()
  return (
    <div>
      <Card>
        <ListGroup className="list-group">
          {todoListData.map((todoItem) => {
            return (
              <React.Fragment key={todoItem.id}>
                <Item data={todoItem} username={username} />
              </React.Fragment>
            )
          })}
        </ListGroup>
      </Card>
    </div>
  )
}
