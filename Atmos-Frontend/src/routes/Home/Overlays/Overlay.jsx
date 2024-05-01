import React, { useState, useEffect } from 'react'
import { fetchSensorDataAPI } from '../../../api/api'
import MeasuresModal from '../Navbar/MeasuresModal'
import { Transition } from '@headlessui/react'

import './Scrollbar.css'
import './Overlay.css'

const fetchFromHour = 720

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
		field1: 'Loading...', // Temperature
		field2: 'Loading...', // Humidity
		field3: 'Loading...', // CO2
		field4: 'Loading...', // CO
		field5: 'Loading...', // UV Index
		field6: 'Loading...', // PM2.5
		lastUpdate: '',
	})

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
		const co2Value = parseFloat(sensorData.field3)
		const coValue = parseFloat(sensorData.field4)
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
			const hour = 60 * 60 * 1000
			const end = new Date().toISOString()
			const start = new Date(Date.now() - fetchFromHour * hour).toISOString()

			try {
				const feeds = await fetchSensorDataAPI(start, end)
				if (feeds.length > 0) {
					const latestData = feeds[feeds.length - 1]
					setSensorData({
						field1: parseFloat(latestData.field1).toFixed(1),
						field2: parseFloat(latestData.field2).toFixed(0),
						field3: parseFloat(latestData.field3).toFixed(4),
						field4: parseFloat(latestData.field4).toFixed(4),
						field5: parseFloat(latestData.field5).toFixed(0),
						field6: parseFloat(latestData.field6).toFixed(4),
						lastUpdate: new Date(latestData.created_at).toLocaleString(),
					})
				}
			} catch (error) {
				console.error('Failed to fetch sensor data:', error)
				setSensorData((prevState) => ({
					...prevState,
					field1: 'Error',
					field2: 'Error',
					field3: 'Error',
					field4: 'Error',
					field5: 'Error',
					field6: 'Error',
					lastUpdate: 'Error',
				}))
			}
		}

		const tipInterval = setInterval(() => {
			setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tipsArray.length)
		}, 5000)

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
				{/* Top Overlay */}
				<div className="flex h-32 w-full flex-col items-center justify-center rounded-[3rem] bg-accent align-middle">
					<h1 className="font-sans mx-10 text-center text-2xl font-medium text-primary">
						Nearest Station From Your Location:
					</h1>
					<h2 className="font-sans mx-10 my-1 text-center text-2xl font-light text-primary">
						Thu Duc City
					</h2>
				</div>
				{/* Bottom Overlay */}
				<div className="flex w-full flex-grow flex-col rounded-[3rem] bg-neutral text-black">
					{/* Current AQI and quick tips */}
					<div className="relative flex h-32 w-full flex-grow flex-col items-center justify-around bg-neutral pt-4">
						{/* LIVE Badge */}
						<div className="absolute left-4 top-4 flex h-8 w-16 items-center justify-center rounded-lg bg-red-400">
							<p className="text-primary">LIVE</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<p className="mb-[-1rem] mt-[-2rem] py-0 text-[6rem]">8</p>
							<p className="my-0 py-0 text-xl font-light text-green-500">
								Fair
							</p>
							{/* Current Date and Time */}
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
								{(ref) => (
									<p
										ref={ref}
										className="text-center text-lg font-medium text-accent"
									>
										Tips: <br /> {determineTip()[currentTipIndex]}
									</p>
								)}
							</Transition>
						</div>
					</div>
					{/* Grid Layout of 6 Air Quality Indexes */}
					<div className="m-0 grid grid-cols-2 gap-0 p-0">
						<div
							className="flex h-28 w-full flex-col items-center justify-center border-2 border-x-0 border-b-0"
							style={{
								backgroundColor: getColorForValue(
									sensorData.field1,
									'temperature',
								),
							}}
						>
							<div className="text-2xl font-medium">
								<div>{sensorData.field1 + '°C'}</div>
							</div>
							<div className="text-">Temperature</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center border-2 border-b-0 border-r-0"
							style={{
								backgroundColor: getColorForValue(
									sensorData.field2,
									'humidity',
								),
							}}
						>
							<div className="text-2xl font-medium">
								<div>{sensorData.field2 + '%'}</div>
							</div>
							<div>Humidity</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center border-2 border-x-0 border-b-0"
							style={{
								backgroundColor: getColorForValue(sensorData.field3, 'co2'),
							}}
						>
							<div className="text-xl font-medium">
								<div>{sensorData.field3 + 'ppm'}</div>
							</div>
							<div>CO2</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center border-2 border-b-0 border-r-0"
							style={{
								backgroundColor: getColorForValue(sensorData.field4, 'co'),
							}}
						>
							<div className="text-xl font-medium">
								<div>{sensorData.field4 + 'ppm'}</div>
							</div>
							<div>CO</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center rounded-bl-[3rem] border-2 border-x-0 border-b-0"
							style={{
								backgroundColor: getColorForValue(sensorData.field5, 'uvIndex'),
							}}
						>
							<div className="text-2xl font-medium">
								<div>{sensorData.field5}</div>
							</div>
							<div>UV Index</div>
						</div>
						<div
							className="flex h-28 w-full flex-col items-center justify-center rounded-br-[3rem] border-2 border-b-0 border-r-0"
							style={{
								backgroundColor: getColorForValue(sensorData.field6, 'pm25'),
							}}
						>
							<div className="text-xl font-medium">
								<div>{sensorData.field6 + 'ppm'}</div>
							</div>
							<div>PM2.5</div>
						</div>
					</div>
				</div>
			</div>
			{/* Table Overlay */}
			{showTableOverlay && (
				<div
					className="absolute right-[-2.4rem] top-0 z-10 flex w-[70rem] flex-col overflow-hidden rounded-bl-[3rem] rounded-tl-[3rem] bg-primary shadow-xl"
					style={{ height: '90vh' }}
				>
					<div
						className="modal-scrollbar ml-8 mr-[3rem] mt-8 overflow-y-auto"
						style={{ maxHeight: '85vh' }}
					>
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
