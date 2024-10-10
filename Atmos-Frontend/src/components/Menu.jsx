import { Link, useLocation } from 'react-router-dom'

import logoBadge from '../assets/logo-badge.png'

const NavItem = [
	{
		name: 'Map',
		link: '/',
	},
	{
		name: 'Dashboard',
		link: '/dashboard',
	},
	// {
	// 	name: 'Setting',
	// 	link: '/setting',
	// },
	{
		name: 'About Us',
		link: '/about',
	},
]

const Menu = () => {
	const location = useLocation()

	return (
		<>
			<div className="fixed left-0 top-0 z-10 flex h-screen w-60 flex-col items-center justify-center border-r-2 border-black bg-primary">
				<div className="mb-12 mt-12 flex h-32 w-40 transform items-center justify-center rounded-xl bg-white shadow-md">
					<img
						src={logoBadge}
						alt="Atmos logo badge"
						style={{ scale: '70%' }}
					/>
				</div>
				<div className="mb-48 flex h-screen w-60 flex-col items-center justify-center text-xl font-bold">
					{NavItem.map((item, index) => (
						<Link to={item.link} key={index}>
							<button
								className={`btn-primary p-4 ${
									location.pathname === item.link
										? 'bg-accent text-white'
										: 'text-black'
								} hover:bg-accent hover:text-white`}
								style={{
									width: '10rem',
									height: '4rem',
									marginBottom: '1rem',
								}}
							>
								{item.name}
							</button>
						</Link>
					))}
				</div>
				<div className="absolute bottom-4">
					<p className="text-center text-sm text-gray-600">
						©Atmos 2024. All rights reserved.
					</p>
				</div>
			</div>
		</>
	)
}

export default Menu
