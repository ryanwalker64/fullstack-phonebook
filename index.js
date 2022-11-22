const { request } = require('express')
const express = require('express')
const app = express()

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    const entry = phonebook.find(entry => entry.id === id)
    if(!entry) {
        return response.status(404).json({
            error: 'entry does not exist'
        })
    }
    response.json(entry)
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    const entry = phonebook.find(entry => entry.id === id)
    if(!entry) {
        return response.status(404).json({
            error: 'entry does not exist'
        })
    }

    phonebook = phonebook.filter(phonebookEntry => phonebookEntry.id !== id)
    response.json(phonebook)
})



app.get('/info', (request, response) => {
    response.send(`
    <h1>Phonebook Entries: ${phonebook.length}</h1>
    <p>${new Date()}</p>
    `)
})

function generateId() {
    const maxId = phonebook.length > 0
        ? Math.max(...phonebook.map(phone => phone.id))
        : 0

    return maxId + 1
}


app.post('/api/phonebook', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing' 
          })
    }

    const entry = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId(),
    }

    console.log(entry)
    
    phonebook = phonebook.concat(entry)

    response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})