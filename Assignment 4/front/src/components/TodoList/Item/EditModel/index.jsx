import React, { useRef, useState } from 'react'
import {
  Button,
  Modal,
  Form,
  FloatingLabel,
  ToggleButton,
} from 'react-bootstrap'
import { useTodo } from '../../../../contexts/TodoContext'

export default function EditModel(props) {
  const { onHide } = props
  const { getItem, updateItem, deleteItem } = useTodo()
  const currentItem = getItem(props.itemID)
  const descriptionRef = useRef()
  const titleRef = useRef()
  const [checked, setChecked] = useState(currentItem.isDone)

  const handleSave = async (e) => {
    try {
      updateItem(
        props.itemID,
        titleRef.current.value,
        descriptionRef.current.value,
        checked
      )
      onHide()
    } catch (error) {}
  }

  const handleDelete = async (itemID) => {
    deleteItem(props.itemID)
    onHide()
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
                defaultValue={currentItem.title}
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
              defaultValue={currentItem.description}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={handleDelete}
          disabled={currentItem.author !== props.author}
        >
          Delete
        </Button>
        <ToggleButton
          className="custom-edit-toggle-btn"
          id="edit-toggle-check"
          type="checkbox"
          variant="outline-dark"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          {checked ? 'Completed' : 'Pending'}
        </ToggleButton>
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
