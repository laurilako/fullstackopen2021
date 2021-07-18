import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.newAnecdote.value
        e.target.newAnecdote.value = ''
        dispatch(addNewAnecdote(content))
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

export default AnecdoteForm