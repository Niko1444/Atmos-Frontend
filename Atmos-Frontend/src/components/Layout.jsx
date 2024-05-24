import Menu from './Menu'
import { useMediaQuery } from 'react-responsive'
import TopNavigation from './TopNavigation'

function Layout({ children }) {
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 938px)',
	})

	return (
		<>
			{isDesktopOrLaptop ? (
				<div className="flex flex-row">
					<Menu />
					<div className="ml-60 flex flex-1 flex-col">
						<div className="flex items-center justify-center">{children}</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col">
					<TopNavigation />
					<div className="flex items-center justify-center">{children}</div>
				</div>
			)}
		</>
	)
}

export default Layout
