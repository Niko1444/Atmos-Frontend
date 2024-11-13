import PropTypes from 'prop-types'

export const datapointsPerLabel = 3

/**
 * Generates chart data labels configuration.
 *
 * @param {boolean} showLabelsOnChange - Whether to show labels only when significant changes occur.
 * @param {number} decimalPlaces - Number of decimal places to format the label values.
 * @param {number} range - The range within which changes are considered significant.
 * @returns {Object} Configuration object for chart data labels.
 */

export function generateChartDataLabels(
	showLabelsOnChange = false,
	decimalPlaces = 5,
	range = 0.001,
) {
	const DataLabels = {
		display: function (context) {
			if (!showLabelsOnChange) {
				return true
			}
			if (
				context.dataIndex % 10 === 0 ||
				Math.abs(
					context.dataset.data[context.dataIndex] -
						context.dataset.data[context.dataIndex - 1],
				) > range
			) {
				return true
			}
			return false
		},
		anchor: 'end',
		align: 'center',
		color: 'black',
		formatter: function (value) {
			return (
				Math.round(value * Math.pow(10, decimalPlaces)) /
				Math.pow(10, decimalPlaces)
			)
		},
		labels: {
			title: {
				font: {
					weight: 'bold',
				},
			},
		},
	}
	return DataLabels
}

export const TimeButtons = ({ hours, setHours }) => {
	const handleHoursChange = (newHours) => {
		setHours(newHours)
	}

	const handleInputChange = (e) => {
		const value = parseInt(e.target.value, 10)
		if (!isNaN(value) && value > 0) {
			setHours(value) // Only set valid positive numbers
		}
	}

	return (
		<div className="text-center font-primary">
			<div className="mb-4 flex justify-center space-x-4">
				<button
					onClick={() => handleHoursChange(24)}
					className={`rounded border px-4 py-2 text-black transition duration-300 ${
						hours === 24
							? 'bg-accent font-bold text-white'
							: 'bg-white hover:bg-gray-100'
					}`}
				>
					24 Hours
				</button>
				<button
					onClick={() => handleHoursChange(48)}
					className={`font-semibold rounded border px-4 py-2 text-black transition duration-300 ${
						hours === 48
							? 'bg-accent font-bold text-white'
							: 'bg-white hover:bg-gray-100'
					}`}
				>
					48 Hours
				</button>
				<button
					onClick={() => handleHoursChange(72)}
					className={`font-semibold rounded border px-4 py-2 text-black transition duration-300 ${
						hours === 72
							? 'bg-accent font-bold text-white'
							: 'bg-white hover:bg-gray-100'
					}`}
				>
					72 Hours
				</button>
			</div>

			{/* Number input for flexible time range */}
			<div className="flex items-center justify-center space-x-2">
				<label htmlFor="customHours" className="text-lg text-black">
					Custom Hours:
				</label>
				<input
					type="number"
					id="customHours"
					className="w-24 rounded border bg-white px-3 py-2 text-black"
					value={hours}
					min="1"
					onChange={handleInputChange}
				/>
			</div>
		</div>
	)
}

TimeButtons.propTypes = {
	hours: PropTypes.number,
	setHours: PropTypes.func,
}
