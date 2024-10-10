// Import necessary libraries
import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Import Components
import SelectAlgorithmBtn from '../../routes/Dashboard/SelectAlgorithmBtn'

// Import Chart Variables
import { hours, datapointsPerLabel } from './ChartVariable'
import { generateChartDataLabels } from './ChartVariable'

// Import API
import { fetchUVDataAPI } from '../../api/api'
import { getUVProphetAPI } from '../../api/callAPIModels'
import { getUVGBAPI } from '../../api/callAPIModels'
import { getUVXGBAPI } from '../../api/callAPIModels'
import { getUVRFAPI } from '../../api/callAPIModels'

Chart.register(ChartDataLabels)

function UVChart() {
	const chartRef = useRef(null)
	const [selectedModel, setSelectedModel] = useState(null)
	const [uvData, setUVData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchDataAndRenderChart()
	}, [])

	const fetchDataAndRenderChart = async () => {
		try {
			const hour = 60 * 60 * 1000
			const end = new Date().toISOString()
			const start = new Date(Date.now() - hours * hour).toISOString()

			const data = await fetchUVDataAPI(start, end)
			const filteredData = data.filter(
				(feed) => Math.round(parseFloat(feed.field5)) !== 0,
			)
			setUVData(filteredData)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching UV data:', error)
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
					data = await getUVProphetAPI()
					break
				case 'GB':
					data = await getUVGBAPI()
					break
				case 'XGB':
					data = await getUVXGBAPI()
					break
				case 'RF':
					data = await getUVRFAPI()
					break
				default:
					data = await fetchDataAndRenderChart()
			}

			const forecast_dates = data.forecast_dates
			const forecast_values = data.forecast_values
			const forecastData = forecast_dates.map((date, index) => {
				return {
					field5: forecast_values[index],
					created_at: date,
				}
			})

			setUVData(forecastData)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching UV data:', error)
			setLoading(false)
		}
	}

	useEffect(() => {
		if (chartRef.current && uvData.length > 0) {
			const ctx = chartRef.current.getContext('2d')
			const uvs = uvData.map((feed) => parseFloat(feed.field5))

			const labels = uvData.map((feed, index) => {
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
							label: 'UV Index',
							data: uvs,
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
								text: 'UV Index',
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
										label += context.parsed.y + ' UV Index'
									}

									if (context.dataIndex < uvData.length) {
										const feed = uvData[context.dataIndex]
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
						datalabels: generateChartDataLabels(true, 2, 0.2),
					},
				},
			})

			return () => {
				myChart.destroy()
			}
		}
	}, [uvData])

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
						<h1 className="h1">UV Chart</h1>
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

export default UVChart
