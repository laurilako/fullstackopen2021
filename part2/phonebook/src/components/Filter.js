import React from 'react'

const Filter = ({filter, onChange}) =>{
    return(
    <form>
      <div>Filter shown contacts with <input filter={filter}
      onChange={onChange}/>
      </div>
    </form>
    )
}

export default Filter
