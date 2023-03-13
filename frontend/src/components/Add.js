// importing the necessary dependencies
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

function Add({ addProject }) {
  // initialise state variables
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [URL, setURL] = useState("");
  // functions to open and close the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function to handle form submission followed by sending POST request to API
  const handleSubmit = async () => {
    const newProject = { title, description, URL };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/",
        newProject
      );
      addProject(response.data);
      setTitle("");
      setDescription("");
      setURL("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Render everything
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={URL}
                onChange={(e) => setURL(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
