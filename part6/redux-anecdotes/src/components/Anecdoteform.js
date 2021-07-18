import React from 'react'
import { useDispatch } from 'react-redux'
import { onCreation, nullNotification } from '../reducers/notificationReducer'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.newAnecdote.value
        e.target.newAnecdote.value = ''
        dispatch(addNewAnecdote(content))
        dispatch(onCreation(content))
        setTimeout(() => {
            dispatch(nullNotification())
        }, 5000)
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