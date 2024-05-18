import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function TopNavigation() {
	const location = useLocation()

	const getActiveStyles = (path) => {
		return location.pathname === path ? 'bg-accent text-white' : 'bg-neutral'
	}

	return (
		<div
			className="flex w-full border-b border-black"
			style={{
				gap: '1px',
			}}
		>
			<NavLink
				to="/"
				className={`btn flex-grow rounded-none border-none text-black hover:bg-accent hover:text-white ${getActiveStyles('/')}`}
			>
				Map
			</NavLink>
			<NavLink
				to="/dashboard"
				className={`btn flex-grow rounded-none border-none text-black hover:bg-accent hover:text-white ${getActiveStyles('/dashboard')}`}
			>
				Dashboard
			</NavLink>
			<NavLink
				to="/about"
				className={`btn flex-grow rounded-none border-none text-black hover:bg-accent hover:text-white ${getActiveStyles('/about')}`}
			>
				About
			</NavLink>
		</div>
	)
}

export default TopNavigation
