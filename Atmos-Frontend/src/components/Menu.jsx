import React from 'react'
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
	{
		name: 'Setting',
		link: '/setting',
	},
	{
		name: 'About Us',
		link: '/about',
	},
]

const Menu = () => {
	const location = useLocation()

	return (
		<>
			<div className="fixed left-0 top-0 flex h-screen w-60 flex-col items-center justify-center bg-primary">
				<div className="absolute top-12 flex h-32 w-40 transform items-center justify-center rounded-xl bg-white">
					<img
						src={logoBadge}
						alt="Atmos logo badge"
						style={{ scale: '70%' }}
					/>
				</div>
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
		</>
	)
}

export default Menu
