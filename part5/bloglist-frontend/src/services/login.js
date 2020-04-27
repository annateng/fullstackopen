import axios from 'axios'
const baseUrl = '/api/login'

const login = async(info) => {
  const newUser = {
    username: info.username,
    password: info.password
  }
  try {
    const res = await axios.post(baseUrl, newUser)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export default { login } 