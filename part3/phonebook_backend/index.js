require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person.js");
const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api", (request, response) => {
  response.send("<h1>Phonebook API</h1>");
});

app.get("/api/info", (request, response) => {
  Person.find({}).then((persons) => {
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    `);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const person = persons.find((p) => p.id === request.params.id);

  if (person) {
    persons = persons.filter((p) => p.id !== person.id);
    response.json(person);
  } else {
    return response.status(404).json({
      error: "person not found",
    });
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const name = body.name;
  const number = body.number;
  if (!name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
