// import necessary dependencies
import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import Add from "./Add";
import axios from "axios";

// Define state variables
function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProject, setEditProject] = useState({
    id: "",
    title: "",
    description: "",
    URL: "",
  });
  // use useEffect hook to fetch data from API when the component mounts
  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:3001/api");
      setProjects(result.data);
    }
    fetchData();
  }, []);
  // function for handling project deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/${id}`);
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  // function for showing the delete confirmation modal
  const handleShowDeleteModal = (projectId) => {
    setDeleteProjectId(projectId);
    setShowDeleteModal(true);
  };
  // function for handling project editing
  const handleEdit = (project) => {
    setShowEditModal(true);
    setEditProject(project);
  };
  // function for closing the edit modal
  const handleEditClose = () => {
    setShowEditModal(false);
  };
  // function for saving changes to an edited project
  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/${editProject.id}`,
        editProject
      );
      const updatedProjects = projects.map((project) =>
        project.id === editProject.id ? editProject : project
      );
      setProjects(updatedProjects);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // function for adding a new project
  const handleAddProject = async (newProject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/",
        newProject
      );
      setProjects([...projects, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // rendering the app
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through each project in the projects array and display them in a table row */}
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.URL}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(project)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleShowDeleteModal(project.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Render the Add component with the handleAddProject function */}
      <Add addProject={handleAddProject} />
      {/* Render the delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(deleteProjectId)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Render the edit project modal if showEditModal is true */}
      {showEditModal && (
        <Modal show={showEditModal} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          {/* Render the edit form in the modal */}
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={editProject.title}
                  onChange={(event) =>
                    setEditProject({
                      ...editProject,
                      title: event.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={editProject.description}
                  onChange={(event) =>
                    setEditProject({
                      ...editProject,
                      description: event.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formBasicURL">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter URL"
                  value={editProject.URL}
                  onChange={(event) =>
                    setEditProject({ ...editProject, URL: event.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ProjectList;
