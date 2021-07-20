import axios from 'axios'
const bUrl = '/api/login'

const login = async creds => {
  const res = await axios.post(bUrl, creds)
  return res.data
}

export default { login }