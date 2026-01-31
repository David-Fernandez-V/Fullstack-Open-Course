const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  return String(Math.floor(Math.random() * 1_000_000_000))
}

const isValidName = (name) => {
  const existingPerson = persons.find(p => p.name === name)
  return existingPerson ? false : true
}

app.get("/", (request, response) => {
    response.send("<h1>Phonebook API</h1>")
})

app.get("/info", (request, response) => {
    const date = new Date()
    const content = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    ` 
    response.send(content)
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const person = persons.find(n => n.id === id)
  if (person) {
    response.json(person)
  } else {
    return response.status(404).json({
      error : "person not found"
    })
  }
  
})

app.delete("/api/persons/:id", (request, response) => {
  const person = persons.find(p => p.id === request.params.id)
  
  if(person){
    persons = persons.filter(p => p.id !== person.id)
    response.status(204).end()
  }else{
    return response.status(404).json({
      error : "person not found"
    })
  }
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  if(!body){
    return response.status(400).json({
      error : "content missing"
    })
  }

  const name = body.name
  const number = body.number
  if(!name){
    return response.status(400).json({
      error : "name missing"
    })
  }

  if(!number){
    return response.status(400).json({
      error : "number missing"
    })
  }

  if(!isValidName(name)){
    return response.status(400).json({
      error : "name must be unique"
    })
  }

  const person = {
    id: generateId(),
    name: name,
    number: number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})