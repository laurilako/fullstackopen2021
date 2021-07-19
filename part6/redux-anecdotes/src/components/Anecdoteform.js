import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.newAnecdote.value
        e.target.newAnecdote.value = ''
        props.addNewAnecdote(content)
        props.setNotification(`Added new anecdote '${content}'`, 5)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="newAnecdote"/></div>
            <button type='submit'>create</button>
            </form>
        </div>
        )
    }
    
const mapStateToProps = (state) => {
    return {
      content: state.content
    }
}

const mapDispatchToProps = { addNewAnecdote, setNotification }

const ConnectedAnecdoteForm = connect(mapStateToProps,
    mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm