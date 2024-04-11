import { fetchSensorDataAPI } from './api'
import React, { useState, useEffect } from 'react'

function CallApi() {
	const [sensorData, setSensorData] = useState([])

	useEffect(() => {
		const fetchSensorData = async () => {
			try {
				// Calculate the start and end times for the past 24 hours
				const hour = 60 * 60 * 1000
				const end = new Date().toISOString()
				const start = new Date(Date.now() - 24 * hour).toISOString()

				const data = await fetchSensorDataAPI(start, end)
				setSensorData(data)
			} catch (error) {
				console.error('Error fetching sensor data:', error)
			}
		}

		fetchSensorData()
	}, [])

	return (
		<>
			<div className=" justify-centerflex flex h-full flex-grow flex-col items-center justify-center">
				<div className="w-full max-w-4xl p-8">
					<h1 className="mb-8 text-4xl font-bold">Sensor Data</h1>
					<ul>
						{sensorData.map((entry, index) => (
							<li key={index} className="mb-4 rounded-lg bg-gray-100 p-4">
								<div className="flex justify-between">
									<div className="flex flex-col">
										<p className="font-bold">Time:</p>
										<p>{new Date(entry.created_at).toLocaleString()}</p>
									</div>
									<div className="flex flex-col">
										<p className="font-bold">Temperature:</p>
										<p>{entry.field1}°C</p>
									</div>
									<div className="flex flex-col">
										<p className="font-bold">Humidity:</p>
										<p>{entry.field2}%</p>
									</div>
									<div className="flex flex-col">
										<p className="font-bold">CO2:</p>
										<p>{entry.field3}ppm</p>
									</div>
									<div className="flex flex-col">
										<p className="font-bold">CO:</p>
										<p>{entry.field4}ppm</p>
									</div>
									<div className="flex flex-col">
										<p className="font-bold">UV:</p>
										<p>{entry.field5}</p>
									</div>
									<div className="flex flex-col">
										<p className="font-bold">PM:</p>
										<p>{entry.field6}</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default CallApi
