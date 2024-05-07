import axios from 'axios'

const BASE_URL = 'https://atmos-latest.onrender.com'
const BASE_URL_PREDICT = 'https://atmos-latest.onrender.com/predict'

// Current AQI
export const getAQIAPI = async () => {
	const response = await axios.get(`${BASE_URL}/aqi`)
	return response.data
}

// Predict Prophet
export const getTemperatureProphetAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/prophet-temp`)
	return response.data
}

export const getHumidityProphetAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/prophet-humi`)
	return response.data
}

export const getCO2ProphetAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/prophet-co2`)
	return response.data
}

export const getCOProphetAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/prophet-co`)
	return response.data
}

export const getUVProphetAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/prophet-uv`)
	return response.data
}

export const getPMProphetAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/prophet-pm`)
	return response.data
}

// Predict GB

export const getTemperatureGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/gb-temp`)
	return response.data
}

export const getHumidityGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/gb-humi`)
	return response.data
}

export const getCO2GBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/gb-co2`)
	return response.data
}

export const getCOGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/gb-co`)
	return response.data
}

export const getUVGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/gb-uv`)
	return response.data
}

export const getPMGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/gb-pm`)
	return response.data
}

// Predict XGB
export const getTemperatureXGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/xgb-temp`)
	return response.data
}

export const getHumidityXGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/xgb-humi`)
	return response.data
}

export const getCO2XGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/xgb-co2`)
	return response.data
}

export const getCOXGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/xgb-co`)
	return response.data
}

export const getUVXGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/xgb-uv`)
	return response.data
}

export const getPMXGBAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/xgb-pm`)
	return response.data
}

// Predict RF
export const getTemperatureRFAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/rf-temp`)
	return response.data
}

export const getHumidityRFAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/rf-humi`)
	return response.data
}

export const getCO2RFAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/rf-co2`)
	return response.data
}

export const getCORFAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/rf-co`)
	return response.data
}

export const getUVRFAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/rf-uv`)
	return response.data
}

export const getPMRFAPI = async () => {
	const response = await axios.get(`${BASE_URL_PREDICT}/rf-pm`)
	return response.data
}
