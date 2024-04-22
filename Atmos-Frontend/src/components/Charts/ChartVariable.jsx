export const hours = 72
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
	decimalPlaces = 2,
	range = 0.001, // Now a parameter to the function
) {
	const DataLabels = {
		display: function (context) {
			if (!showLabelsOnChange) {
				return true
			}
			if (
				context.dataIndex === 0 ||
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
		formatter: function (value, context) {
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
