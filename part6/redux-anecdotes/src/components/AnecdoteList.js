import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { onVote, nullNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)
    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(onVote(content))
        setTimeout(() => {
          dispatch(nullNotification())
        }, 5000);
      }

    return(
      <div>
        <h2>Anecdotes</h2>
        {filter ? anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
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