import React, { useState, useEffect } from 'react'
import axios from 'axios'
import  { useField } from './hooks/index'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getResources = async () => {
      const res = await axios.get(baseUrl)
      setResources([ ...res.data])
    }
  getResources()
  }, [baseUrl])

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource)
    setResources([res.data, ...resources])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('content')
  const name = useField('name')
  const number = useField('number')

  const [notes, noteService] = useResource('http://localhost:3001/notes')
  const [persons, personService] = useResource('http://localhost:3001/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    handleReset()
  }
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    handleReset()
  }
  const handleReset = () => {
    content.onReset()
    name.onReset()
    number.onReset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App