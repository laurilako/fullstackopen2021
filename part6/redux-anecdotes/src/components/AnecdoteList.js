import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdoteFilter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    }

    return(
      <div>
        <h2>Anecdotes</h2>
        {anecdoteFilter ? anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(anecdoteFilter.toString().toLowerCase()))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes} votes
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>)
          :
          <div>
            {anecdotes
              .sort((a, b) => b.votes - a.votes)
              .map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes} votes
                  <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
              </div>)}
          </div>
        }
      </div>
    )
}

export default AnecdoteList