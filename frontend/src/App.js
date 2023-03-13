import React from "react";
import { Container, Navbar } from "react-bootstrap";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>My Projects</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <ProjectList />
      </Container>
    </>
  );
}

// MDN and W3 schools documentations used to complete this task.

export default App;
