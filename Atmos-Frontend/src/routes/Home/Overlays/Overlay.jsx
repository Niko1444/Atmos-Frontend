import { useState, useEffect, useRef } from 'react'
import { fetchSensorDataAPI } from '../../../api/api'
import { getAQIAPI } from '../../../api/callAPIModels'
import MeasuresModal from '../Navbar/MeasuresModal'
import { Transition } from '@headlessui/react'

import './Scrollbar.css'
import './Overlay.css'

const tips = {
	temperature: {
		tooHigh:
			'Stay hydrated. Seek shade or air-conditioned spaces. Wear loose-fitting, light-colored clothing.',
		tooLow:
			'Dress in layers. Avoid prolonged exposure to the cold. Stay indoors if possible.',
		optimal:
			'Enjoy the comfortable temperatures! Remember to stay hydrated and wear sunscreen.',
	},
	humidity: {
		tooHigh:
			'Use a dehumidifier. Stay hydrated. Avoid strenuous outdoor activities.',
		tooLow: 'Use a humidifier. Moisturize your skin. Stay hydrated.',
		optimal: 'Comfortable humidity levels! Take advantage of the nice weather.',
	},
	uvIndex: {
		low: 'Enjoy the outdoors! Remember to wear sunscreen for extended periods outside.',
		moderate:
			'Seek shade during midday hours. Wear protective clothing and sunglasses.',
		high: 'Limit outdoor exposure between 10am-4pm.  Wear protective clothing, sunscreen, and a hat.',
		veryHigh:
			'Stay indoors if possible. If outdoors, take strict precautions with sunscreen, clothing, and shade.',
	},
	co2: {
		low: 'Air quality is excellent! Enjoy the fresh air.',
		moderate: 'Air quality is acceptable. Enjoy outdoor activities.',
		high: 'Air quality is poor. Limit outdoor exposure if possible.',
		veryHigh: 'Air quality is very poor. Avoid outdoor activities.',
	},
	co: {
		low: 'Air quality is excellent! Enjoy the fresh air.',
		moderate: 'Air quality is acceptable. Enjoy outdoor activities.',
		high: 'Air quality is poor. Limit outdoor exposure if possible.',
		veryHigh: 'Air quality is very poor. Avoid outdoor activities.',
	},
	pm25: {
		low: 'Air quality is excellent! Enjoy the fresh air.',
		moderate: 'Air quality is acceptable. Enjoy outdoor activities.',
		high: 'Air quality is poor. Limit outdoor exposure if possible.',
		veryHigh: 'Air quality is very poor. Avoid outdoor activities.',
	},
}

const colorRanges = {
	temperature: [
		// units in °C
		{ max: 15, color: '#dec96d' },
		{ max: 25, color: '#98d6a6' },
		{ max: 35, color: '#dec96d' },
		{ max: 45, color: '#f8956b' },
		{ max: Infinity, color: '#f56773' },
	],
	humidity: [
		// units in %
		{ max: 25, color: '#dec96d' },
		{ max: 30, color: '#b9d188' },
		{ max: 60, color: '#98d6a6' },
		{ max: 70, color: '#f8956b' },
		{ max: Infinity, color: '#f56773' },
	],
	co2: [
		// units in ppm
		{ max: 400, color: '#98d6a6' },
		{ max: 1000, color: '#b9d188' },
		{ max: 2000, color: '#dec96d' },
		{ max: 5000, color: '#edb066' },
		{ max: 10000, color: '#f8956b' },
		{ max: Infinity, color: '#f56773' },
	],
	co: [
		// units in ppm
		{ max: 30, color: '#98d6a6' },
		{ max: 50, color: '#dec96d' },
		{ max: 100, color: '#edb066' },
		{ max: 200, color: '#f8956b' },
		{ max: Infinity, color: '#f56773' },
	],
	uvIndex: [
		// units in UV Index
		{ max: 1, color: '#98d6a6' },
		{ max: 2, color: '#b9d188' },
		{ max: 5, color: '#dec96d' },
		{ max: 7, color: '#edb066' },
		{ max: 10, color: '#f8956b' },
		{ max: Infinity, color: '#f56773' },
	],
	pm25: [
		// units in µg/m³
		{ max: 10, color: '#98d6a6' },
		{ max: 20, color: '#b9d188' },
		{ max: 25, color: '#dec96d' },
		{ max: 50, color: '#edb066' },
		{ max: 75, color: '#f8956b' },
		{ max: Infinity, color: '#f56773' },
	],
	categoryAQI: [
		{ max: 10, color: '#98d6a6' },
		{ max: 8, color: '#b9d188' },
		{ max: 6, color: '#edb066' },
		{ max: 4, color: '#f8956b' },
		{ max: 2, color: '#f56773' },
	],
}

// const colorsIndicator = {
// 	safe: '#98d6a6',
// 	moderate: '#b9d188',
// 	unhealthyForSensitive: '#dec96d',
// 	unhealthy: '#edb066',
// 	veryUnhealthy: '#f8956b',
// 	hazardous: '#f56773',
// }

function Overlay() {
	const [sensorData, setSensorData] = useState({
		Temperature: 'Loading...', // Temperature
		Humidity: 'Loading...', // Humidity
		CO: 'Loading...', // CO
		CO2: 'Loading...', // CO2
		UV: 'Loading...', // UV Index
		Dust: 'Loading...', // PM2.5
		lastUpdate: '',
	})

	const [currentCategoryAQI, setCurrentCategoryAQI] = useState('None')

	const [currentAQI, setCurrentAQI] = useState('...')

	const pRef = useRef(null)

	const [showTableOverlay, setShowTableOverlay] = useState(false)

	const [currentTipIndex, setCurrentTipIndex] = useState(0)

	const tipsArray = [
		tips.temperature,
		tips.humidity,
		tips.uvIndex,
		tips.co2,
		tips.co,
		tips.pm25,
	]

	// Inside your Overlay component
	const determineTip = () => {
		const tempValue = parseFloat(sensorData.field1)
		const humidityValue = parseFloat(sensorData.field2)
		const uvIndexValue = parseFloat(sensorData.field5)
		const coValue = parseFloat(sensorData.field3)
		const co2Value = parseFloat(sensorData.field4)
		const pm25Value = parseFloat(sensorData.field6)

		let tipMessage = []

		// Temperature Logic
		if (tempValue > 32) {
			tipMessage.push(tips.temperature.tooHigh)
		} else if (tempValue < 15) {
			tipMessage.push(tips.temperature.tooLow)
		} else {
			tipMessage.push(tips.temperature.optimal)
		}

		// Humidity Logic
		if (humidityValue > 70) {
			tipMessage.push(tips.humidity.tooHigh)
		} else if (humidityValue < 30) {
			tipMessage.push(tips.humidity.tooLow)
		} else {
			tipMessage.push(tips.humidity.optimal)
		}

		// UV Index Logic
		if (uvIndexValue >= 7) {
			tipMessage.push(tips.uvIndex.veryHigh)
		} else if (uvIndexValue >= 5) {
			tipMessage.push(tips.uvIndex.high)
		} else if (uvIndexValue >= 2) {
			tipMessage.push(tips.uvIndex.moderate)
		} else {
			tipMessage.push(tips.uvIndex.low)
		}

		// CO2 Logic
		if (co2Value >= 2000) {
			tipMessage.push(tips.co2.veryHigh)
		} else if (co2Value >= 1000) {
			tipMessage.push(tips.co2.high)
		} else if (co2Value >= 400) {
			tipMessage.push(tips.co2.moderate)
		} else {
			tipMessage.push(tips.co2.low)
		}

		// CO Logic
		if (coValue >= 200) {
			tipMessage.push(tips.co.veryHigh)
		} else if (coValue >= 100) {
			tipMessage.push(tips.co.high)
		} else if (coValue >= 50) {
			tipMessage.push(tips.co.moderate)
		} else {
			tipMessage.push(tips.co.low)
		}

		// PM2.5 Logic
		if (pm25Value >= 75) {
			tipMessage.push(tips.pm25.veryHigh)
		} else if (pm25Value >= 50) {
			tipMessage.push(tips.pm25.high)
		} else if (pm25Value >= 20) {
			tipMessage.push(tips.pm25.moderate)
		} else {
			tipMessage.push(tips.pm25.low)
		}

		return tipMessage
	}

	useEffect(() => {
		const fetchLatestSensorData = async () => {
			try {
				const response = await fetchSensorDataAPI()
				if (response.length > 0) {
					const latestData = response[0]
					setSensorData({
						Temperature: parseFloat(latestData.Temperature).toFixed(1),
						Humidity: parseFloat(latestData.Humidity).toFixed(0),
						CO: parseFloat(latestData.CO).toFixed(2),
						CO2: parseFloat(latestData.CO2).toFixed(2),
						UV: parseFloat(latestData.UV).toFixed(2),
						Dust: parseFloat(latestData.Dust).toFixed(2),
						lastUpdate: latestData.createdTime,
					})
				}
			} catch (error) {
				console.error('Failed to fetch sensor data:', error)
				setSensorData((prevState) => ({
					...prevState,
					Temperature: 'Error',
					Humidity: 'Error',
					CO: 'Error',
					CO2: 'Error',
					UV: 'Error',
					Dust: 'Error',
					lastUpdate: 'Error',
				}))
			}
		}

		const fetchAQI = async () => {
			try {
				const response = await getAQIAPI()
				setCurrentAQI(response.aqi_score)
				setCurrentCategoryAQI(response.air_quality_category)
			} catch (error) {
				console.error('Failed to fetch AQI:', error)
				setCurrentAQI('Error')
			}
		}

		const tipInterval = setInterval(() => {
			setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tipsArray.length)
		}, 5000)

		fetchAQI()
		fetchLatestSensorData()

		return () => {
			clearInterval(tipInterval)
		}
	}, [tipsArray.length])

	const realtime = sensorData.lastUpdate

	const getColorForValue = (value, type) => {
		const ranges = colorRanges[type]
		const numValue = parseFloat(value)
		const range = ranges.find((r) => numValue <= r.max)
		return range ? range.color : '#ffffff'
	}

	const toggleTableOverlay = () => {
		setShowTableOverlay(!showTableOverlay)
	}

	return (
		<div className="absolute right-[22rem] top-[2rem]">
			<div
				className={`backdrop ${showTableOverlay ? 'show' : ''}`}
				onClick={toggleTableOverlay}
			></div>
			<div
				className="absolute z-20 flex w-[20rem] cursor-pointer flex-col rounded-[3rem] bg-accent shadow-xl"
				style={{ height: '90vh' }}
				onClick={toggleTableOverlay}
			>
				<div className="flex h-32 w-full flex-col items-center justify-center rounded-[3rem] bg-accent align-middle">
					<h1 className="font-sans mx-10 text-center text-2xl font-medium text-primary">
						Nearest Station From Your Location: <br />{' '}
						<h1 className="font-sans mx-10 text-center text-2xl font-medium text-primary underline">
							District 4
						</h1>
					</h1>
				</div>
				<div className="flex w-full flex-grow flex-col rounded-[3rem] bg-neutral text-black">
					<div className="relative flex h-32 w-full flex-grow flex-col items-center justify-around bg-neutral pt-4">
						<div className="absolute left-4 top-4 flex h-8 w-16 items-center justify-center rounded-lg bg-red-400">
							<p className="text-primary">LIVE</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<p className="mb-[-1rem] mt-[-2rem] py-0 text-[6rem]">
								{currentAQI}
							</p>
							<p
								className="my-0 py-0 text-xl font-bold"
								style={{
									color: getColorForValue(currentAQI, 'categoryAQI'),
								}}
							>
								{currentCategoryAQI}
							</p>
							<p className="pb-4 text-sm">{realtime} (last update)</p>
						</div>
						<div className="mx-4 h-28">
							<Transition
								show={true}
								enter="transition-opacity duration-500"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="transition-opacity duration-500"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<p
									ref={pRef}
									className="text-md text-center font-medium text-accent"
								>
									Tips: <br /> {determineTip()[currentTipIndex]}
								</p>
							</Transition>
						</div>
					</div>
					<div className="m-0 grid grid-cols-2 gap-0 p-0">
						<div
							className="flex h-28 w-full flex-col items-center justify-center border-2 border-x-0 border-b-0"
							style={{
								backgroundColor: getColorForValue(
									sensorData.Temperature,
									'temperature',
								),
							}}
						>
							<div className="text-2xl font-medium">
								<div>{sensorData.Temperature + '°C'}</div>
							</div>
							<div className="text-">Temperature</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center border-2 border-b-0 border-r-0"
							style={{
								backgroundColor: getColorForValue(
									sensorData.Humidity,
									'humidity',
								),
							}}
						>
							<div className="text-2xl font-medium">
								<div>{sensorData.Humidity + '%'}</div>
							</div>
							<div>Humidity</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center border-2 border-x-0 border-b-0"
							style={{
								backgroundColor: getColorForValue(sensorData.CO, 'co'),
							}}
						>
							<div className="text-xl font-medium">
								<div>{sensorData.CO + 'ppm'}</div>
							</div>
							<div>CO</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center border-2 border-b-0 border-r-0"
							style={{
								backgroundColor: getColorForValue(sensorData.CO2, 'co2'),
							}}
						>
							<div className="text-xl font-medium">
								<div>{sensorData.CO2 + 'ppm'}</div>
							</div>
							<div>CO2</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center rounded-bl-[3rem] border-2 border-x-0 border-b-0"
							style={{
								backgroundColor: getColorForValue(sensorData.UV, 'uvIndex'),
							}}
						>
							<div className="text-2xl font-medium">
								<div>{sensorData.UV}</div>
							</div>
							<div>UV Index</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center rounded-br-[3rem] border-2 border-b-0 border-r-0"
							style={{
								backgroundColor: getColorForValue(sensorData.Dust, 'pm25'),
							}}
						>
							<div className="text-xl font-medium">
								<div>{sensorData.Dust + 'ppm'}</div>
							</div>
							<div>PM2.5</div>
						</div>
					</div>
				</div>
			</div>
			{showTableOverlay && (
				<div className="absolute right-[-2.4rem] top-0 z-10 flex h-[90vh] w-[40rem] flex-col overflow-hidden rounded-bl-[3rem] rounded-tl-[3rem] bg-primary shadow-xl xl:w-[60rem]">
					<div className="modal-scrollbar ml-8 mr-[3rem] mt-8 overflow-y-auto">
						<div className="flex h-8 w-16 items-center justify-center rounded-xl bg-accent p-5 px-14">
							<p className="font-bold text-primary">MEASURE</p>
						</div>
						<MeasuresModal />
					</div>
				</div>
			)}
		</div>
	)
}

export default Overlay
