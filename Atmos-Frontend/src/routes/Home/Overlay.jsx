import React, { useState, useEffect } from 'react'
import { fetchSensorDataAPI } from '../../api/api'

const tips = 'Have fun and enjoy the fresh air!'

const colorRanges = {
	temperature: [
		// units in °C
		{ max: 15, color: '#c5b355' },
		{ max: 25, color: '#9fcf8b' },
		{ max: 35, color: '#c5b355' },
		{ max: 45, color: '#f0894e' },
		{ max: Infinity, color: '#ff6e61' },
	],
	humidity: [
		// units in %
		{ max: 25, color: '#c5b355' },
		{ max: 30, color: '#9fcf8b' },
		{ max: 60, color: '#b0c26d' },
		{ max: 70, color: '#f0894e' },
		{ max: Infinity, color: '#ff6e61' },
	],
	co2: [
		// units in ppm
		{ max: 400, color: '#9fcf8b' },
		{ max: 1000, color: '#b0c26d' },
		{ max: 2000, color: '#c5b355' },
		{ max: 5000, color: '#dba04a' },
		{ max: 10000, color: '#f0894e' },
		{ max: Infinity, color: '#ff6e61' },
	],
}

colorsIndicator = {
	safe: '#9fcf8b',
	moderate: '#b0c26d',
	unhealthyForSensitive: '#c5b355',
	unhealthy: '#dba04a',
	veryUnhealthy: '#f0894e',
	hazardous: '#ff6e61',
}

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

	useEffect(() => {
		const fetchLatestSensorData = async () => {
			const hour = 60 * 60 * 1000
			const end = new Date().toISOString()
			const start = new Date(Date.now() - 12 * hour).toISOString()

			try {
				const feeds = await fetchSensorDataAPI(start, end)
				if (feeds.length > 0) {
					const latestData = feeds[feeds.length - 1] // Get the latest entry
					setSensorData({
						field1: parseFloat(latestData.field1).toFixed(1) + '°C', // Format to 2 decimal places
						field2: parseFloat(latestData.field2).toFixed(0) + '%',
						field3: parseFloat(latestData.field3).toFixed(4) + 'ppm',
						field4: parseFloat(latestData.field4).toFixed(4) + 'ppm',
						field5: parseFloat(latestData.field5).toFixed(0),
						field6: parseFloat(latestData.field6).toFixed(4) + 'ppm',
						lastUpdate: new Date(latestData.created_at).toLocaleString(),
					})
					console.log('Sensor data:', sensorData)
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

		fetchLatestSensorData()
	}, [])

	const formatDate = (dateStr) => {
		const date = new Date(dateStr)
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
	}

	const realtime = formatDate(new Date().toISOString())

	return (
		<div
			className="absolute right-10 z-10 flex w-[20rem] flex-col rounded-[3rem] bg-accent shadow-xl"
			style={{ height: '90vh' }}
		>
			{/* Top Overlay */}
			<div className="flex h-32 w-full flex-col items-center justify-center rounded-[3rem] bg-accent align-middle">
				<h1 className="mx-10 text-center font-sans text-2xl font-medium text-primary">
					Your position and surroundings:
				</h1>
				<h2 className="mx-10 my-1 text-center font-sans text-2xl font-light text-primary">
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
						<p className="my-0 py-0 text-xl font-light text-green-500">Fair</p>
						{/* Current Date and Time */}
						<p className="pb-4 text-sm">{realtime} (last update)</p>
					</div>
					<div>
						<p className="text-md font-medium text-accent">Tips: {tips}</p>
					</div>
				</div>
				{/* Grid Layout of 6 Air Quality Indexes */}
				<div className="m-0 grid grid-cols-2 gap-0 p-0">
					<div className="flex h-28 w-full flex-col items-center justify-center border-2 border-x-0 border-b-0 bg-white">
						<div className="text-2xl font-medium">
							<div>{sensorData.field1}</div>
						</div>
						<div className="text-">Temperature</div>
					</div>
					<div className="flex h-28 w-full flex-col items-center justify-center border-2 border-b-0 border-r-0 bg-white">
						<div className="text-2xl font-medium">
							<div>{sensorData.field2}</div>
						</div>
						<div>Humidity</div>
					</div>
					<div className="flex h-28 w-full flex-col items-center justify-center border-2 border-x-0 border-b-0 bg-white">
						<div className="text-xl font-medium">
							<div>{sensorData.field3}</div>
						</div>
						<div>CO2</div>
					</div>
					<div className="flex h-28 w-full flex-col items-center justify-center border-2 border-b-0 border-r-0 bg-white">
						<div className="text-xl font-medium">
							<div>{sensorData.field4}</div>
						</div>
						<div>CO</div>
					</div>
					<div className="flex h-28 w-full flex-col items-center justify-center rounded-bl-[3rem] border-2 border-x-0 border-b-0 bg-white">
						<div className="text-2xl font-medium">
							<div>{sensorData.field5}</div>
						</div>
						<div>UV Index</div>
					</div>
					<div className="flex h-28 w-full flex-col items-center justify-center rounded-br-[3rem] border-2 border-b-0 border-r-0 bg-white">
						<div className="text-xl font-medium">
							<div>{sensorData.field6}</div>
						</div>
						<div>PM2.5</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Overlay
