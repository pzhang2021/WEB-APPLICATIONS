import React from 'react'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
import './index.scss'

export default function index({ data, username }) {
  return (
    <ListGroup.Item variant="link" className="list-group-item">
      <div className="list-item">
        <Row className="list-item">
          <Col className="child-status">1 of 3</Col>
          <Col className="child-description" md="auto">
            <div className="title">Title</div>
            <div className="detail">des</div>
          </Col>
          <Col className="child-edit" xs lg="2">
            <Button variant="outline-dark">Edit</Button>
          </Col>
        </Row>
      </div>
    </ListGroup.Item>
  )
}
