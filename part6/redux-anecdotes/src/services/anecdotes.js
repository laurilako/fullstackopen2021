import axios from 'axios'
const bUrl = 'http://localhost:3001/anecdotes'

const asObject = (content) => {
    return {
      content: content,
      votes: 0
    }
  }

const getAll = async () => {
    const res = await axios.get(bUrl)
    return res.data
}

const vote = async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1}
    const res = await axios.put(`${bUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return res.data
}

const createNew = async (content) => {
    const obj = asObject(content)
    const res = await axios.post(bUrl, obj)
    return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, createNew, vote}