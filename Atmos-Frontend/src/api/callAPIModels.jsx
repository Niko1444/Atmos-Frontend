import axios from 'axios'

const BASE_URL = 'https://atmos-latest.onrender.com'

export const getAQIAPI = async () => {
	const response = await axios.get(`${BASE_URL}/aqi`)
	return response.data
}
