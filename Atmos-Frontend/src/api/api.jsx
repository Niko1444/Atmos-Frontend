import axios from 'axios'

const timezone = 'Asia%2FBangkok'
const API_KEY = 'MP0MEWPWMADVCPMG'
const CHANNEL_ID = 2465663

// Define the URLs
// export const urls = [
// 	`https://api.thingspeak.com/channels/${CHANNEL_ID}/status.json?api_key=${API_KEY}`,
// 	`https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/1.json?api_key=${API_KEY}`,
// 	`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}`,
// ]

//------------All data----------------
export const fetchSensorDataAPI = async (start, end) => {
	try {
		// Construct the URL with start and end time parameters
		const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}&start=${start}&end=${end}`
		const response = await axios.get(url)
		if (response.data && response.data.feeds) {
			return response.data.feeds
		} else {
			throw new Error('Invalid response format')
		}
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error // Rethrow the error to handle it in the component
	}
}

//------------Temperature----------------
export const fetchTemperatureDataAPI = async (start, end) => {
	try {
		const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/1.json?timezone=${timezone}&results=288&start=${start}&end=${end}`
		const response = await axios.get(url)
		if (response.data && response.data.feeds) {
			return response.data.feeds
		} else {
			throw new Error('Invalid response format')
		}
	} catch (error) {
		console.error('Error fetching temperature:', error)
		throw error
	}
}

//------------Humidity----------------
