import axios from 'axios'
const baseUrl = '/api/login'

const login = async(user) => {
  try {
    const res = await axios.post(baseUrl, user)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export default { login }