const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let projects = [
  {
    id: 1,
    title: "React Game!",
    description: "Tic tac toe game created using Create React app.",
    URL: "http://heroku/myapp/game/",
  },
  {
    id: 2,
    title: "Online store",
    description: "Online store created with HTML, CSS and JavaScript.",
    URL: "https://git.com/myrepos/shop/index",
  },
];

// GET request for retrieving all projects
app.get("/api", (req, res) => {
  res.json(projects);
});

// POST request for adding a new project
app.post("/api", (req, res) => {
  const newProject = {
    id: projects.length + 1,
    title: req.body.title,
    description: req.body.description,
    URL: req.body.URL,
  };
  projects.push(newProject);
  res.json(newProject);
});

// DELETE request for removing a project by ID
app.delete("/api/:id", (req, res) => {
  const projectId = req.params.id;
  projects = projects.filter((project) => project.id !== parseInt(projectId));
  res.json(projects);
});

// PUT request for updating a project by ID
app.put("/api/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(
    (project) => project.id === parseInt(projectId)
  );
  if (project) {
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.URL = req.body.URL || project.URL;
    res.json(project);
  } else {
    res.status(404).send("Project not found");
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(express.static(path.join(__dirname, "frontend/build")));
