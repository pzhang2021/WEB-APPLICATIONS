import React, { useState } from 'react'
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap'

export default function EditModel(props) {
  const { onHide } = props
  const [title, setTitle] = useState(props.currenttitle)
  const [decription, setDecription] = useState(props.currentdecription)

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editing {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control placeholder={"Made by " + props.author} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Title" className="mb-3">
              <Form.Control type="text" placeholder="title" id="edit-title" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Description"
              id="edit-description"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
