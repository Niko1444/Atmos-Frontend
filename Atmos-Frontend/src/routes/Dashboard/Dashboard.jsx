import React from 'react'
import CallApi from '../../api/CallApi'
import TempChart from '../../components/Charts/TempChart'

function Dashboard() {
	return (
		<>
			<div>
				<TempChart />
				<TempChart />
				<TempChart />
				<TempChart />
				<TempChart />
				<TempChart />
				{/* <CallApi /> */}
			</div>
		</>
	)
}

export default Dashboard
