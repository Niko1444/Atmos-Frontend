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
				className={`btn w-1/3 rounded-none border-none pb-12 pt-4 text-xl text-black hover:bg-accent hover:text-white ${getActiveStyles('/')}`}
			>
				Map
			</NavLink>
			<NavLink
				to="/dashboard"
				className={`btn w-1/3 rounded-none border-none pb-12 pt-4 text-xl text-black hover:bg-accent hover:text-white ${getActiveStyles('/dashboard')}`}
			>
				Dashboard
			</NavLink>
			<NavLink
				to="/about"
				className={`btn w-1/3 rounded-none border-none pb-12 pt-4 text-xl text-black hover:bg-accent hover:text-white ${getActiveStyles('/about')}`}
			>
				About
			</NavLink>
		</div>
	)
}

export default TopNavigation
