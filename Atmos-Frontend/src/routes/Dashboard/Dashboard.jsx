import React from 'react'
import TempChart from '../../components/Charts/TempChart'
import HumidityChart from '../../components/Charts/HumidityChart'
import CO2Chart from '../../components/Charts/CO2Chart'
import COChart from '../../components/Charts/COChart'
import UVChart from '../../components/Charts/UVChart'
import PMChart from '../../components/Charts/PMChart'

import { useMediaQuery } from 'react-responsive'
import BreadDog from '../../assets/bread-dog.jpeg'

function Dashboard() {
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1440px)',
	})

	return (
		<>
			<div className="flex flex-col items-center justify-center pb-20 pt-20 align-middle">
				{!isDesktopOrLaptop ? (
					<>
						<h1 className="text-center text-xl font-bold text-black">
							You can only view the Dashboard on desktop for now hehehehe
						</h1>
						<img
							src={BreadDog}
							alt="a dog in a bread lol"
							className="h-[25rem] w-full object-cover"
						/>
					</>
				) : (
					<>
						<TempChart />
						<HumidityChart />
						<CO2Chart />
						<COChart />
						<UVChart />
						<PMChart />
					</>
				)}
			</div>
		</>
	)
}

export default Dashboard
