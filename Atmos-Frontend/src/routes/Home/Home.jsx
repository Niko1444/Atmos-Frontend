import Map from './Map/Map'
import Overlay from './Overlays/Overlay'
import MobileOverlay from './Overlays/MobileOverlay'
import { useMediaQuery } from 'react-responsive'

function Home() {
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 938px)',
	})

	return (
		<>
			<Map />
			{isDesktopOrLaptop ? <Overlay /> : <MobileOverlay />}
		</>
	)
}

export default Home
