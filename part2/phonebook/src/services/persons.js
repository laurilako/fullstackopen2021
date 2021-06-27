import axios from 'axios'
const bUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(bUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(bUrl, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${bUrl}/${id}`)
    return request
}

const update = (id, numObj) => {
    const request = axios.put(`${bUrl}/${id}`, numObj)
    return request.then(response => response.data)
}

const exportedObj = {getAll, create, remove, update}

export default exportedObj