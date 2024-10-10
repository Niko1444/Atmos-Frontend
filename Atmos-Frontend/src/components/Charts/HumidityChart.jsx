// Import necessary libraries
import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Import Chart Variables
import { datapointsPerLabel } from './ChartVariable'
import { generateChartDataLabels } from './ChartVariable'

// Import Components
import SelectAlgorithmBtn from '../../routes/Dashboard/SelectAlgorithmBtn'

// Import API
import { fetchHumidityDataAPI } from '../../api/api'
import { getHumidityProphetAPI } from '../../api/callAPIModels'
import { getHumidityGBAPI } from '../../api/callAPIModels'
import { getHumidityXGBAPI } from '../../api/callAPIModels'
import { getHumidityRFAPI } from '../../api/callAPIModels'

Chart.register(ChartDataLabels)

function HumidityChart({ hours }) {
	const chartRef = useRef(null)
	const [selectedModel, setSelectedModel] = useState(null)
	const [humidityData, setHumidityData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchDataAndRenderChart()
	}, [])

	const fetchDataAndRenderChart = async () => {
		try {
			const hour = 60 * 60 * 1000
			const end = new Date().toISOString()
			const start = new Date(Date.now() - hours * hour).toISOString()

			const data = await fetchHumidityDataAPI(start, end)
			const filteredData = data.filter((feed) => parseFloat(feed.field2) !== 0)
			setHumidityData(filteredData)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching humidity data:', error)
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
					data = await getHumidityProphetAPI()
					break
				case 'GB':
					data = await getHumidityGBAPI()
					break
				case 'XGB':
					data = await getHumidityXGBAPI()
					break
				case 'RF':
					data = await getHumidityRFAPI()
					break
				default:
					data = await fetchDataAndRenderChart()
			}

			const forecast_dates = data.forecast_dates
			const forecast_values = data.forecast_values
			const forecastData = forecast_dates.map((date, index) => {
				return {
					field2: forecast_values[index],
					created_at: date,
				}
			})

			setHumidityData(forecastData)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching temperature data:', error)
			setLoading(false)
		}
	}

	useEffect(() => {
		if (chartRef.current && humidityData.length > 0) {
			const ctx = chartRef.current.getContext('2d')
			const humidities = humidityData.map((feed) => parseFloat(feed.field2))
			const labels = humidityData.map((feed, index) => {
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
							label: 'Humidity',
							data: humidities,
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
								text: 'Humidity (%)',
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
										label += context.parsed.y + '%'
									}

									if (context.dataIndex < humidityData.length) {
										const feed = humidityData[context.dataIndex]
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
						datalabels: generateChartDataLabels(true, 2),
					},
				},
			})

			return () => {
				myChart.destroy()
			}
		}
	}, [humidityData])

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
						<h1 className="h1">Humidity Chart</h1>
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
					style={{ width: '70rem', height: '25rem', marginBottom: '2rem' }}
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

export default HumidityChart
