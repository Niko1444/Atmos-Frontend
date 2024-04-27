import Menu from './Menu'

function Layout({ children }) {
	return (
		<div className="flex flex-row">
			<Menu />
			<div className="ml-60 flex flex-1 flex-col">
				<div className="flex items-center justify-center">{children}</div>
			</div>
		</div>
	)
}

export default Layout
