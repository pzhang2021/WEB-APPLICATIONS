import React, { useRef } from 'react'
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap'
import { useTodo } from '../../../../contexts/TodoContext'

export default function EditModel(props) {
  const { onHide } = props
  const { getItem, saveItem, doneTask } = useTodo()
  const currentItem = getItem(props.itemID)
  const descriptionRef = useRef()
  const titleRef = useRef()

  const handleSave = async (e) => {
    try {
      saveItem(
        props.itemID,
        titleRef.current.value,
        descriptionRef.current.value
      )
      onHide()
    } catch (error) {}
  }
  const handleDone = async (e) => {
    try {
      doneTask(props.itemID)
      onHide()
    } catch (error) {}
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {currentItem.author === props.author ? 'Edit' : 'Invalid Author'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder={'Author: ' + currentItem.author}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Title" className="mb-3">
              <Form.Control
                ref={titleRef}
                type="text"
                placeholder="title"
                id="edit-title"
                disabled={currentItem.author !== props.author}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              ref={descriptionRef}
              as="textarea"
              rows={5}
              placeholder="Description"
              id="edit-description"
              disabled={currentItem.author !== props.author}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={handleDone}
          disabled={currentItem.author !== props.author}
        >
          Done
        </Button>
        <Button
          variant="dark"
          onClick={handleSave}
          disabled={currentItem.author !== props.author}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
