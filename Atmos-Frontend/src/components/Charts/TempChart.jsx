// Import necessary libraries
import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useMediaQuery } from 'react-responsive'

// Import Components
import SelectAlgorithmBtn from '../../routes/Dashboard/SelectAlgorithmBtn'

// Import Chart Variables
import { generateChartDataLabels } from './ChartVariable'
import { hours, datapointsPerLabel } from './ChartVariable'

// Import API
import { fetchTemperatureDataAPI } from '../../api/api'
import { getTemperatureProphetAPI } from '../../api/callAPIModels'
import { getTemperatureGBAPI } from '../../api/callAPIModels'
import { getTemperatureXGBAPI } from '../../api/callAPIModels'
import { getTemperatureRFAPI } from '../../api/callAPIModels'

Chart.register(ChartDataLabels)

function TempChart() {
	const chartRef = useRef(null)
	const [selectedModel, setSelectedModel] = useState(null)
	const [temperatureData, setTemperatureData] = useState([])
	const [loading, setLoading] = useState(true)

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
			setLoading(false)
		} catch (error) {
			console.error('Error fetching temperature data:', error)
			setLoading(false)
		}
	}

	const handleAlgorithmSelect = async (algorithm) => {
		setSelectedModel(algorithm)
		try {
			let data
			setLoading(true)
			switch (algorithm) {
				case 'Prophet':
					data = await getTemperatureProphetAPI()
					break
				case 'GB':
					data = await getTemperatureGBAPI()
					break
				case 'XGB':
					data = await getTemperatureXGBAPI()
					break
				case 'RF':
					data = await getTemperatureRFAPI()
					break
				default:
					data = await fetchDataAndRenderChart()
			}

			const forecast_dates = data.forecast_dates
			const forecast_values = data.forecast_values
			const forecastData = forecast_dates.map((date, index) => {
				return {
					field1: forecast_values[index],
					created_at: date,
				}
			})

			setTemperatureData(forecastData)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching temperature data:', error)
			setLoading(false)
		}
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
					return ''
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
						datalabels: generateChartDataLabels(true, 1, 0.1),
					},
				},
			})

			return () => {
				myChart.destroy()
			}
		}
	}, [temperatureData])

	const handleRefresh = () => {
		setLoading(true)
		if (selectedModel) {
			handleAlgorithmSelect(selectedModel)
		} else {
			fetchDataAndRenderChart()
		}
	}

	return (
		<div className="mt-5 rounded-xl border-4 border-accent bg-white px-5">
			<div>
				<div className="flex items-center justify-between py-5">
					<div>
						<h1 className="h1">Temperature Chart</h1>
						{selectedModel ? (
							<p>Forecasted data using {selectedModel} model</p>
						) : (
							<p>Historical data of {hours} hours ago</p>
						)}
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
					className="flex items-center justify-center align-middle"
					style={{
						width: '70rem',
						height: '25rem',
						marginBottom: '2rem',
					}}
				>
					{loading ? (
						<>
							<div className="mb-10">
								<span className="loading loading-ring loading-lg"></span>
								<span className="loading loading-ring loading-lg"></span>
								<span className="loading loading-ring loading-lg"></span>
							</div>
						</>
					) : (
						<canvas ref={chartRef}></canvas>
					)}
				</div>
			</div>
		</div>
	)
}

export default TempChart
