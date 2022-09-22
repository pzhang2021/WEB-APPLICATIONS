import React, { useState } from 'react'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import EditModel from './EditModel'

export default function Item({ data, username }) {
  const [modalShow, setModalShow] = useState(false)
  const now = new Date()
  return (
    <ListGroup.Item variant="link" className="custom-list-group-item">
      <div>
        <Row className="custom-list-item">
          <Col className="child-status">
            <div className="current-time">14 : 22</div>
            <div className="current-day">Wed</div>
          </Col>
          <Col className="child-description" md="auto">
            <div className="title">{data.title}</div>
            <div className="detail">{data.description}</div>
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
        <EditModel
          show={modalShow}
          onHide={() => setModalShow(false)}
          author={username}
          currenttitle="Shopping"
          currentdescription="Hello from pengju"
        />
      </div>
    </ListGroup.Item>
  )
}
