import { useState } from 'react'
import { TimeButtons } from '../../components/Charts/ChartVariable'
import TempChart from '../../components/Charts/TempChart'
import HumidityChart from '../../components/Charts/HumidityChart'
import CO2Chart from '../../components/Charts/CO2Chart'
import COChart from '../../components/Charts/COChart'
import UVChart from '../../components/Charts/UVChart'
import PMChart from '../../components/Charts/PMChart'

import { useMediaQuery } from 'react-responsive'

function Dashboard() {
	const [hours, setHours] = useState(24)
	const [refresh, setRefresh] = useState(false)
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1440px)',
	})

	// Handle refresh
	const handleRefresh = () => {
		setRefresh(!refresh)
	}

	return (
		<>
			<div className="mt-2 flex flex-col items-center justify-center pb-10 pt-4 align-middle">
				{!isDesktopOrLaptop ? (
					<>
						<h1 className="text-center text-xl font-bold text-black">
							You can only view the Dashboard on desktop for now
						</h1>
					</>
				) : (
					<>
						<TimeButtons hours={hours} setHours={setHours} />
						<button
							onClick={handleRefresh}
							className="font-semibold mt-4 w-full rounded bg-black px-4 py-2 text-white transition duration-300 hover:bg-yellow-600"
						>
							Refresh Charts
						</button>
						<p className="pt-2">
							Refrest the chart after selecting the time range to view the data
						</p>
						<TempChart key={`temp-${refresh}`} hours={hours} />
						<HumidityChart key={`humidity-${refresh}`} hours={hours} />
						<CO2Chart key={`co2-${refresh}`} hours={hours} />
						<COChart key={`co-${refresh}`} hours={hours} />
						<UVChart key={`uv-${refresh}`} hours={hours} />
						<PMChart key={`pm-${refresh}`} hours={hours} />
					</>
				)}
			</div>
		</>
	)
}

export default Dashboard
