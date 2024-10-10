import axios from 'axios'

const timezone = 'Asia%2FBangkok'
const API_KEY = 'ZTXGJNPIUX2DRHVS'
const CHANNEL_ID = 2146196

// Define the URLs
// export const urls = [
// 	`https://api.thingspeak.com/channels/${CHANNEL_ID}/status.json?api_key=${API_KEY}`,
// 	`https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/1.json?api_key=${API_KEY}`,
// 	`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}`,
// ]

const url = `https://api.thingspeak.com/channels/2465663/feeds.json?api_key=MP0MEWPWMADVCPMG`

//------------All data----------------
export const fetchSensorDataAPI = async (start, end) => {
	try {
		const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}&start=${start}&end=${end}`
		const response = await axios.get(url)
		if (response.data && response.data.feeds) {
			return response.data.feeds
		} else {
			throw new Error('Invalid response format')
		}
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
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
export const fetchHumidityDataAPI = async (start, end) => {
	try {
		const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/2.json?timezone=${timezone}&results=288&start=${start}&end=${end}`
		const response = await axios.get(url)
		if (response.data && response.data.feeds) {
			return response.data.feeds
		} else {
			throw new Error('Invalid response format')
		}
	} catch (error) {
		console.error('Error fetching humidity:', error)
		throw error
	}
}

//------------CO2----------------
export const fetchCO2DataAPI = async (start, end) => {
	try {
		const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/3.json?timezone=${timezone}&results=288&start=${start}&end=${end}`
		const response = await axios.get(url)
		if (response.data && response.data.feeds) {
			return response.data.feeds
		} else {
			throw new Error('Invalid response format')
		}
	} catch (error) {
		console.error('Error fetching CO2:', error)
		throw error
	}
}

//------------CO----------------
export const fetchCODataAPI = async (start, end) => {
	try {
		const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/4.json?timezone=${timezone}&results=288&start=${start}&end=${end}`
		const response = await axios.get(url)
		if (response.data && response.data.feeds) {
			return response.data.feeds
		} else {
			throw new Error('Invalid response format')
		}
	} catch (error) {
		console.error('Error fetching CO:', error)
		throw error
	}
}

//------------UV----------------
export const fetchUVDataAPI = async (start, end) => {
	try {
		const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/5.json?timezone=${timezone}&results=288&start=${start}&end=${end}`
		const response = await axios.get(url)
		if (response.data && response.data.feeds) {
			return response.data.feeds
		} else {
			throw new Error('Invalid response format')
		}
	} catch (error) {
		console.error('Error fetching UV:', error)
		throw error
	}
}

//------------PM----------------
export const fetchPMDataAPI = async (start, end) => {
	try {
		const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/6.json?timezone=${timezone}&results=288&start=${start}&end=${end}`
		const response = await axios.get(url)
		if (response.data && response.data.feeds) {
			return response.data.feeds
		} else {
			throw new Error('Invalid response format')
		}
	} catch (error) {
		console.error('Error fetching PM:', error)
		throw error
	}
}
