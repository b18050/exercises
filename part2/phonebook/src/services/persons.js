import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
} 

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const erase = (personid) => {
	console.log(personid)
	const url = `${baseUrl}/${personid}`
	const request = axios.delete(url)
	if (window.confirm("Do you really want it to delete ")) {
		return request.then(response => response.data)
    }
}

const update = (id, newObject) => {
	console.log(newObject)
	const url = `${baseUrl}/${id}`
	const request = axios.put(url, newObject) 
	return request.then(response => response.data)

}

export default { getPersons , create, erase , update }