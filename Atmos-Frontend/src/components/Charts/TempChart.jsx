import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import { fetchTemperatureDataAPI } from '../../api/api'

function TempChart() {
	const chartRef = useRef(null)
	const hours = 48
	const datapointsPerLabel = 6
	const [temperatureData, setTemperatureData] = useState([])

	useEffect(() => {
		const fetchDataAndRenderChart = async () => {
			try {
				const hour = 60 * 60 * 1000
				const end = new Date().toISOString()
				const start = new Date(Date.now() - hours * hour).toISOString()

				const data = await fetchTemperatureDataAPI(start, end)
				const filteredData = data.filter(
					(feed) => parseFloat(feed.field1) !== 0,
				)
				setTemperatureData(filteredData)
			} catch (error) {
				console.error('Error fetching temperature data:', error)
			}
		}

		fetchDataAndRenderChart()
	}, [])

	useEffect(() => {
		if (chartRef.current && temperatureData.length > 0) {
			const ctx = chartRef.current.getContext('2d')
			const temperatures = temperatureData.map((feed) =>
				parseFloat(feed.field1),
			)
			const labels = temperatureData.map((feed, index) => {
				if (index % datapointsPerLabel === 0) {
					const date = new Date(feed.created_at)
					return date.toLocaleTimeString('en-US', { hour12: true })
				} else {
					return '' // Skip adding label but keep data point
				}
			})

			const myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Temperature',
							data: temperatures,
							fill: false,
							borderColor: 'rgb(75, 192, 192)',
							tension: 0.1,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						x: {
							title: {
								display: true,
								text: 'Time',
							},
							ticks: {
								maxRotation: 0,
								minRotation: 0,
							},
						},
						y: {
							title: {
								display: true,
								text: 'Temperature (°C)',
							},
						},
					},
					plugins: {
						tooltip: {
							callbacks: {
								label: function (context) {
									let label = context.dataset.label || ''
									if (label) {
										label += ': '
									}
									if (context.parsed.y !== null) {
										label += context.parsed.y + ' °C'
									}
									if (context.dataIndex < temperatureData.length) {
										const feed = temperatureData[context.dataIndex]
										const date = new Date(feed.created_at)
										label =
											date.toLocaleTimeString('en-US', { hour12: true }) +
											' - ' +
											label
									}
									return label
								},
							},
						},
					},
				},
			})

			return () => {
				myChart.destroy()
			}
		}
	}, [temperatureData])

	return (
		<div className="z-0 mt-5 rounded-xl border-4 border-accent bg-white px-5 pb-28">
			<div className=" z-10" style={{ width: '70rem', height: '25rem' }}>
				<div className=" py-5">
					<h1 className="h1">Temperature Chart</h1>
					<p>Historical data of {hours} hours ago</p>
				</div>
				<canvas ref={chartRef}></canvas>
			</div>
		</div>
	)
}

export default TempChart
