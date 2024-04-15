import React from 'react'
import CallApi from '../../api/CallApi'
import TempChart from '../../components/Charts/TempChart'
import HumidityChart from '../../components/Charts/HumidityChart'
import CO2Chart from '../../components/Charts/CO2Chart'
import COChart from '../../components/Charts/COChart'
import UVChart from '../../components/Charts/UVChart'
import PMChart from '../../components/Charts/PMChart'

function Dashboard() {
	return (
		<>
			<div>
				<TempChart />
				<HumidityChart />
				<CO2Chart />
				<COChart />
				<UVChart />
				<PMChart />
				{/* <CallApi /> */}
			</div>
		</>
	)
}

export default Dashboard
