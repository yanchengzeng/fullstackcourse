import axios from 'axios'
const baseUrl = 'http://localhost:5000/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(
    `${baseUrl}`,
    newObject,
    { headers: { Authorization: bearerToken() } }
  )
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.patch(
    `${baseUrl}/${id}`,
    newObject,
    { headers: { Authorization: bearerToken() } }
  )
  return request.then(response => response.data)
}

function bearerToken() {
  let jj = sessionStorage.getItem("jwt");
  let authContent = `Bearer ${jj}`;
  return authContent
}

export default { getAll, create, update }