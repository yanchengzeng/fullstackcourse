import axios from 'axios'
const baseUrl = 'http://localhost:5000/tokens'

const authenticate = body => {
    const request = axios.post(`${baseUrl}/login`, body)
    return request.then(response => response.data)
  }

const createUser = body => {
    const request = axios.post(`${baseUrl}/signup`, body);
    return request.then(response => response.data)
}

export default { authenticate, createUser }