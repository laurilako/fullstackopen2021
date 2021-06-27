import React from 'react'

const PersonForm = ({newName, newNumber, onSubmit, onNumChange, onNameChange}) => {
    return(  
      <form onSubmit={onSubmit}>
      <div>Name: <input value={newName} onChange={onNameChange}/></div>
      <div>Number: <input value={newNumber} onChange={onNumChange}/></div>
      <div>
        <button type="submit">add name</button>
      </div>
    </form>
    )
}

export default PersonForm