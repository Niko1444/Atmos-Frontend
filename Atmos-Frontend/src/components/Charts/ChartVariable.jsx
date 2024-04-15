export const hours = 24
export const datapointsPerLabel = 10

export function generateChartDataLabels(
	showLabelsOnChange = false,
	decimalPlaces = 2,
) {
	const DataLabels = {
		display: function (context, range = 0.001) {
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
