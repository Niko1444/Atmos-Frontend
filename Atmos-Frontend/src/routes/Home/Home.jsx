import { useEffect } from 'react'
import Map from './Map/Map'
import Overlay from './Overlays/Overlay'
import MobileOverlay from './Overlays/MobileOverlay'
import { useMediaQuery } from 'react-responsive'

function Home() {
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 938px)',
	})

	useEffect(() => {
		// Disable scrolling on the body
		const disableScroll = () => {
			document.body.style.overflow = 'hidden'
		}

		// Re-enable scrolling on component unmount (if needed)
		const enableScroll = () => {
			document.body.style.overflow = 'auto'
		}

		// Apply the disable scroll on mount
		disableScroll()

		// Clean up on unmount
		return () => enableScroll()
	}, [])

	return (
		<>
			<Map />
			{isDesktopOrLaptop ? <Overlay /> : <MobileOverlay />}
		</>
	)
}

export default Home
