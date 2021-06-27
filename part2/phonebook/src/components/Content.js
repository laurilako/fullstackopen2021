import React from 'react'

const Content = ({persons, filter, handleClick}) => {
    return(
    <div>
      {filter ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map((person => {
        return(
          <div key={person.name}>
            {person.name} {person.number}
            <button value={person.name} onClick={handleClick}>delete</button>
          </div>
          )
      }))
      : persons.map((person) => {
          return(
            <div key={person.name}>
              {person.name} {person.number}
              <button value={person.name} onClick={handleClick}>delete</button>
            </div>)}
      )}
    </div>
  )
}

export default Content