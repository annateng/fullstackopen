import axios from 'axios'
const baseUrl = '/api/login'

const login = async(username, password) => {
  const newUser = {
    username: username,
    password: password
  }
  try {
    const res = await axios.post(baseUrl, newUser)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export default { login } 