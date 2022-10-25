import React, { useState } from 'react'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import EditModel from './EditModel'

export default function Item({ currentItem, username }) {
  const [modalShow, setModalShow] = useState(false)
  return (
    <ListGroup.Item
      variant={currentItem.isUrgent ? 'warning' : 'link'}
      className="custom-list-group-item"
    >
      <div>
        <Row className="custom-list-item">
          <Col className="child-status">
            <div className="current-time">
              {currentItem.time["Hour"] + ':' + currentItem.time["Minute"]}
            </div>
            <div className="current-day">{currentItem.time["Day"]}</div>
          </Col>
          <Col className="child-description" md="auto">
            <div className="title">
              {currentItem.isDone ? (
                <del>{currentItem.title}</del>
              ) : (
                currentItem.title
              )}
            </div>
            <div className="detail">
              {currentItem.isDone ? (
                <del>{currentItem.description}</del>
              ) : (
                currentItem.description
              )}
            </div>
          </Col>
          <Col className="child-edit" xs lg="2">
            <Button variant="outline-dark" onClick={() => setModalShow(true)}>
              <IconContext.Provider
                value={{ color: 'black', className: 'global-class-name' }}
              >
                <FaRegEdit />
              </IconContext.Provider>
            </Button>
          </Col>
        </Row>
        <div className="urgent-bar"></div>
        <EditModel
          show={modalShow}
          onHide={() => setModalShow(false)}
          author={username}
          itemID={currentItem.todoId}
        />
      </div>
    </ListGroup.Item>
  )
}
