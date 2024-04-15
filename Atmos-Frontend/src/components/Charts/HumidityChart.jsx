import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import SelectAlgorithmBtn from '../../routes/Dashboard/SelectAlgorithmBtn'
import { fetchHumidityDataAPI } from '../../api/api'

import { hours, datapointsPerLabel } from './ChartVariable'
import { generateChartDataLabels } from './ChartVariable'

Chart.register(ChartDataLabels)

function HumidityChart() {
	const chartRef = useRef(null)
	const [humidityData, setHumidityData] = useState([])

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
		} catch (error) {
			console.error('Error fetching humidity data:', error)
		}
	}

	const handleAlgorithmSelect = (algorithm) => {
		console.log('Selected algorithm:', algorithm)
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
		fetchDataAndRenderChart()
	}

	return (
		<div className="mt-5 rounded-xl border-4 border-accent bg-white px-5">
			<div>
				<div className="flex items-center justify-between py-5">
					<div>
						<h1 className="h1">Humidity Chart</h1>
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

export default HumidityChart
