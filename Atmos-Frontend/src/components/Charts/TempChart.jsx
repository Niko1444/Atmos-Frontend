import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import SelectAlgorithmBtn from '../../routes/Dashboard/SelectAlgorithmBtn'
import { fetchTemperatureDataAPI } from '../../api/api'

import { hours, datapointsPerLabel } from './ChartVariable'

Chart.register(ChartDataLabels)

function TempChart() {
	const chartRef = useRef(null)
	const [temperatureData, setTemperatureData] = useState([])

	useEffect(() => {
		fetchDataAndRenderChart()
	}, [])

	const fetchDataAndRenderChart = async () => {
		try {
			const hour = 60 * 60 * 1000
			const end = new Date().toISOString()
			const start = new Date(Date.now() - hours * hour).toISOString()

			const data = await fetchTemperatureDataAPI(start, end)
			const filteredData = data.filter((feed) => parseFloat(feed.field1) !== 0)
			setTemperatureData(filteredData)
		} catch (error) {
			console.error('Error fetching temperature data:', error)
		}
	}

	const handleAlgorithmSelect = (algorithm) => {
		console.log('Selected algorithm:', algorithm)
		// Your logic to handle the selected algorithm
	}

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
							borderColor: 'orange',
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
									let label = ''

									if (context.dataset.label) {
										label += context.dataset.label + ': '
									}

									if (context.parsed.y !== null) {
										label += context.parsed.y + '°C'
									}

									if (context.dataIndex < temperatureData.length) {
										const feed = temperatureData[context.dataIndex]
										const date = new Date(feed.created_at)

										label =
											date.toLocaleTimeString('en-US', { hour12: true }) +
											' - ' +
											label
										label += ' on ' + date.toLocaleDateString('en-US')
									}
									return label
								},
							},
						},
						datalabels: {
							display: function (context) {
								if (
									context.dataIndex === 0 ||
									context.dataset.data[context.dataIndex] !==
										context.dataset.data[context.dataIndex - 1]
								) {
									return true
								}
								return false
							},
							anchor: 'end',
							align: 'center',
							color: 'black',
							labels: {
								title: {
									font: {
										weight: 'bold',
									},
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

	const handleRefresh = () => {
		fetchDataAndRenderChart()
	}

	return (
		<div className="mt-5 rounded-xl border-4 border-accent bg-white px-5">
			<div>
				<div className="flex items-center justify-between py-5">
					<div>
						<h1 className="h1">Temperature Chart</h1>
						<p>Historical data of {hours} hours ago</p>
					</div>
					<div className="flex">
						<div>
							<button className="btn-now" onClick={handleRefresh}>
								Refresh
							</button>
						</div>
						<SelectAlgorithmBtn onSelectAlgorithm={handleAlgorithmSelect} />
					</div>
				</div>
				<div
					className="flex"
					style={{ width: '70rem', height: '25rem', marginBottom: '2rem' }}
				>
					<canvas ref={chartRef}></canvas>
				</div>
			</div>
		</div>
	)
}

export default TempChart
