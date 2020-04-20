import axios from "axios";

const baseUrl = "http://localhost:3600/api/persons";

const create = (newObject) => axios
    .post(baseUrl, newObject)
    .then(response => response.data)

const update = (id, newObject) => axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(response => response => response.data)

const getAll = () => axios
    .get(baseUrl)
    .then(response => response.data)

const deleteEntry = (id) => axios
    .delete(`${baseUrl}/${id}`)
    .then(response => {console.log('successful deletion')})


export default { create, update, getAll, deleteEntry };
