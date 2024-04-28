import React from 'react'

const MeasuresModal = () => {
	const measureContent = {
		title: 'Measures',
		content: [
			{
				subtitle: 'Air Quality Index(AQI) - US EPA Standard',
				url: 'https://www.airnow.gov/aqi/aqi-basics/',
				measureRange: [
					{
						range: '0-50',
						colorBG: '#98d6a6',
						colorText: '#0e0e0e',
						qualityAssessment: 'Good',
						description:
							'Air quality is considered satisfactory, and air pollution poses little or no risk.',
					},
					{
						range: '51-100',
						colorBG: '#b9d188',
						colorText: '#0e0e0e',
						qualityAssessment: 'Moderate',
						description:
							'Air quality is acceptable; however, there may be some health concerns for a few sensitive individuals.',
					},
					{
						range: '101-150',
						colorBG: '#dec96d',
						colorText: '#000',
						qualityAssessment: 'Unhealthy for Sensitive Groups',
						description:
							'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
					},
					{
						range: '151-200',
						colorBG: '#edb066',
						colorText: '#000',
						qualityAssessment: 'Unhealthy',
						description:
							'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
					},
					{
						range: '201-300',
						colorBG: '#f8956b',
						colorText: '#000',
						qualityAssessment: 'Very Unhealthy',
						description:
							'Health alert: everyone may experience more serious health effects.',
					},
					{
						range: '301-500',
						colorBG: '#f56773',
						colorText: '#000',
						qualityAssessment: 'Hazardous',
						description:
							'Health warnings of emergency conditions. The entire population is more likely to be affected.',
					},
				],
			},
			{
				subtitle: 'Temperature - Standards Guidelines',
				url: 'https://www.researchgate.net/publication/363472655_MONITORING_SOLUTIONS_FOR_SMART_AGRICULTURE/figures?lo=1',
				measureRange: [
					{
						range: '0 - 15°C',
						colorBG: '#dec96d',
						colorText: '#000',
						qualityAssessment: 'Very cold',
						description:
							'Typically no effects, possible drowsiness with prolonged exposure.',
					},
					{
						range: '15 - 25°C',
						colorBG: '#98d6a6',
						colorText: '#000',
						qualityAssessment: 'Cold',
						description:
							'May cause headaches, dizziness, nausea, and fatigue in healthy individuals after prolonged exposure',
					},
					{
						range: '25 - 35°C',
						colorBG: '#dec96d',
						colorText: '#000',
						qualityAssessment: 'Normal',
						description:
							'Can impair coordination and judgment, and cause vomiting and shortness of breath',
					},
					{
						range: '35 - 45°C',
						colorBG: '#f8956b',
						colorText: '#000',
						qualityAssessment: 'Warm',
						description:
							'Can cause loss of consciousness and death within hours.',
					},
					{
						range: '> 45°C',
						colorBG: '#f56773',
						colorText: '#000',
						qualityAssessment: 'Hot',
						description: 'Can cause death within minutes.',
					},
				],
			},
			{
				subtitle: 'Humidity - Standards Guidelines',
				url: 'https://www.airthings.com/en/contaminants/what-is-humidity',
				measureRange: [
					{
						range: '< 25%',
						colorBG: '#dec96d',
						colorText: '#000',
						qualityAssessment: 'Very dry',
						description:
							'Try drying clothes indoors using a drying rack rather than a tumble dryer. Ensure that you have plenty of ventilation when doing so.',
					},
					{
						range: '25 - 30%',
						colorBG: '#b9d188',
						colorText: '#000',
						qualityAssessment: 'Dry',
						description:
							'Fair humidity levels, keep monitoring. If you have a humidifier, you can use it to increase the humidity in your home.',
					},
					{
						range: '30 - 60%',
						colorBG: '#98d6a6',
						colorText: '#000',
						qualityAssessment: 'Normal',
						description:
							'Can impair coordination and judgment, and cause vomiting and shortness of breath. Maintain your healthy levels.',
					},
					{
						range: '60 - 70%',
						colorBG: '#f8956b',
						colorText: '#000',
						qualityAssessment: 'Humid',
						description:
							'Can cause loss of consciousness and death within hours. Fair humidity levels, keep monitoring',
					},
					{
						range: '> 70%',
						colorBG: '#f56773',
						colorText: '#000',
						qualityAssessment: 'Very humid',
						description:
							'Can cause death within minutes. Running a dehumidifier. Open windows for an hour or two on dry days',
					},
				],
			},
			{
				subtitle: 'CO2 Value - Standards Guidelines',
				url: 'https://www.fsis.usda.gov/sites/default/files/media_file/2020-08/Carbon-Dioxide.pdf',
				measureRange: [
					{
						range: '0 - 10,000 ppm',
						colorBG: '#98d6a6',
						colorText: '#000',
						qualityAssessment: 'Normal',
						description:
							'Typically no effects, possible drowsiness with prolonged exposure.',
					},
					{
						range: '10 - 15,000 ppm',
						colorBG: '#b9d188',
						colorText: '#000',
						qualityAssessment: 'Moderate',
						description: 'Mild respiratory stimulation for some people.',
					},
					{
						range: '15 - 30,000 ppm',
						colorBG: '#dec96d',
						colorText: '#000',
						qualityAssessment: 'Unhealthy',
						description:
							'Moderate respiratory stimulation, increased heart rate and blood pressure, ACGIH TLV-Short Term.',
					},
					{
						range: '30 - 40,000 ppm',
						colorBG: '#edb066',
						colorText: '#000',
						qualityAssessment: 'Dangerous',
						description: 'Immediately Dangerous to Life or Health (IDLH).',
					},
					{
						range: '40 - 50,000 ppm',
						colorBG: '#f8956b',
						colorText: '#000',
						qualityAssessment: 'Very dangerous',
						description:
							'Strong respiratory stimulation, dizziness, confusion, headache, shortness of breath.',
					},
					{
						range: '50 - 80,000 ppm',
						colorBG: '#f56773',
						colorText: '#000',
						qualityAssessment: 'Hazardous',
						description:
							'Dimmed sight, sweating, tremor, unconsciousness, and possible death.',
					},
				],
			},
			{
				subtitle: 'CO Value - Standards Guidelines',
				url: 'https://www.fsis.usda.gov/sites/default/files/media_file/2020-08/Carbon-Monoxide.pdf',
				measureRange: [
					{
						range: '0 - 30 ppm',
						colorBG: '#98d6a6',
						colorText: '#000',
						qualityAssessment: 'Normal',
						description:
							'Typically no effects, possible drowsiness with prolonged exposure.',
					},
					{
						range: '30 - 50 ppm',
						colorBG: '#dec96d',
						colorText: '#000',
						qualityAssessment: 'Moderate',
						description:
							'May cause headaches, dizziness, nausea, and fatigue in healthy individuals after prolonged exposure',
					},
					{
						range: '50 - 100 ppm',
						colorBG: '#edb066',
						colorText: '#000',
						qualityAssessment: 'Unhealthy',
						description:
							'Can impair coordination and judgment, and cause vomiting and shortness of breath',
					},
					{
						range: '100 - 200 ppm',
						colorBG: '#f8956b',
						colorText: '#000',
						qualityAssessment: 'Dangerous',
						description:
							'Can cause loss of consciousness and death within hours.',
					},
					{
						range: '> 200 ppm',
						colorBG: '#f56773',
						colorText: '#000',
						qualityAssessment: 'Hazardous',
						description: 'Can cause death within minutes.',
					},
				],
			},
			{
				subtitle: 'UV Index - Standards Guidelines',
				url: 'https://enviro.epa.gov/facts/uv/index.html',
				measureRange: [
					{
						range: '0 - 1',
						colorBG: '#98d6a6',
						colorText: '#000',
						qualityAssessment: 'Normal',
						description:
							'Typically no effects, possible drowsiness with prolonged exposure.',
					},
					{
						range: '1 - 2',
						colorBG: '#b9d188',
						colorText: '#000',
						qualityAssessment: 'Moderate',
						description: 'Minimal Risk',
					},
					{
						range: '3 - 5',
						colorBG: '#dec96d',
						colorText: '#000',
						qualityAssessment: 'Unhealthy',
						description: 'Moderate Risk',
					},
					{
						range: '6 - 7',
						colorBG: '#edb066',
						colorText: '#000',
						qualityAssessment: 'Dangerous',
						description: 'High Risk',
					},
					{
						range: '8 - 10',
						colorBG: '#f8956b',
						colorText: '#000',
						qualityAssessment: 'Dangerous',
						description: 'Very High Risk',
					},
					{
						range: ' > 11',
						colorBG: '#f56773',
						colorText: '#000',
						qualityAssessment: 'Very dangerous',
						description: 'Extreme Risk',
					},
				],
			},
			{
				subtitle: 'Particular Matter 2.5 (PM2.5) - Standards Guidelines',
				url: 'https://ecmwf-projects.github.io/copernicus-training-cams/proc-aq-index.html',
				measureRange: [
					{
						range: '0 - 10',
						colorBG: '#98d6a6',
						colorText: '#000',
						qualityAssessment: 'Very good',
						description:
							'Typically no effects, possible drowsiness with prolonged exposure.',
					},
					{
						range: '10 - 20',
						colorBG: '#b9d188',
						colorText: '#000',
						qualityAssessment: 'Good',
						description: 'Normal',
					},
					{
						range: '20 - 25',
						colorBG: '#dec96d',
						colorText: '#000',
						qualityAssessment: 'Medium',
						description: 'Moderate Risk',
					},
					{
						range: '25 - 50',
						colorBG: '#edb066',
						colorText: '#000',
						qualityAssessment: 'Poor',
						description: 'High Risk',
					},
					{
						range: '50 - 75',
						colorBG: '#f8956b',
						colorText: '#000',
						qualityAssessment: 'Dangerous',
						description: 'Very High Risk',
					},
					{
						range: '75 - 800',
						colorBG: '#f56773',
						colorText: '#000',
						qualityAssessment: 'Extremely dangerous',
						description: 'Extreme Risk',
					},
				],
			},
		],
	}

	return (
		<>
			<div className="flex items-center justify-center">
				<div className="overflow-hidden rounded-lg shadow-lg">
					<div className="p-6">
						{measureContent.content.map((measure, index) => (
							<div key={index} className="mb-4 last:mb-0">
								<div className="mb-2 flex items-center justify-between">
									<span className="text-lg font-medium text-gray-800">
										{index + 1}. {measure.subtitle}
									</span>
									<a
										href={measure.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 transition duration-150 ease-in-out hover:text-blue-600"
									>
										Reference
									</a>
								</div>
								<div className="overflow-x-auto">
									<table className="w-full text-left text-sm text-gray-500">
										<thead className="bg-gray-50 text-xs uppercase text-gray-700">
											<tr>
												<th scope="col" className="px-6 py-3">
													Range
												</th>
												<th scope="col" className="px-6 py-3">
													Quality Assessment
												</th>
												<th scope="col" className="px-6 py-3">
													Description
												</th>
											</tr>
										</thead>
										<tbody>
											{measure.measureRange.map((range, idx) => (
												<tr
													key={idx}
													className={`bg-${range.colorBG}-500 text-${range.colorText}-800`}
													style={{
														backgroundColor: range.colorBG,
														color: range.colorText,
													}}
												>
													<td className="px-6 py-4">{range.range}</td>
													<td className="px-6 py-4">
														{range.qualityAssessment}
													</td>
													<td className="px-6 py-4">{range.description}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default MeasuresModal
