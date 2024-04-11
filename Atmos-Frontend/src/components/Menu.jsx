import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// NavItem
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
		<div className="flex h-screen w-60 flex-col items-center justify-start bg-primary py-80">
			{NavItem.map((item, index) => (
				<Link to={item.link} key={index}>
					<button
						className={`btn-primary p-4 ${
							location.pathname === item.link
								? 'bg-accent text-white'
								: 'text-black'
						} hover:bg-accent hover:text-white`}
						style={{ width: '10rem', height: '4rem', marginBottom: '1rem' }}
					>
						{item.name}
					</button>
				</Link>
			))}
		</div>
	)
}

export default Menu
