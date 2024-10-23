import { useState } from 'react'
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
	LayersControl,
	LayerGroup,
	Circle,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import CustomMarker from '../../../assets/custom-marker.png'
import CustomUser from '../../../assets/icon-user.png'

import './Map.css'

function Map() {
	// Lab Position
	// const firstPosition = [10.86748937028891, 106.79438149449618]

	// SPKT Position
	// const firstPosition = [10.850363, 106.771915]

	// IU Position
	// const firstPosition = [10.877707, 106.802017]

	// Phan Thiet Position
	// const firstPosition = [10.92742, 108.10197]

	// Conference Position
	const firstPosition = [10.75527, 106.69043]

	const customIconMarker = new L.Icon({
		iconUrl: CustomMarker,
		iconSize: [88, 99],
		iconAnchor: [42, 70],
	})

	const customIconUserLocation = new L.Icon({
		iconUrl: CustomUser,
		iconSize: [74, 74],
		iconAnchor: [30, 62],
	})

	const stationMarkers = [
		{
			key: 'marker1',
			position: firstPosition,
			children: 'Station 1 - Thu Duc City',
		},
	]

	const LocationMarker = () => {
		const [position, setPosition] = useState(null)
		const map = useMapEvents({
			click() {
				map.locate()
			},
			locationfound(e) {
				setPosition(e.latlng)
				map.flyTo(e.latlng, map.getZoom())
			},
		})

		return position === null ? null : (
			<Marker position={position} icon={customIconUserLocation}>
				<Popup>
					<span
						style={{
							fontSize: '1.2rem',
							fontWeight: 'bold',
						}}
					>
						You are here
					</span>
				</Popup>
			</Marker>
		)
	}

	const CircleMarkers = ({ markers }) => {
		return markers.map((marker) => (
			<LayerGroup key={marker.key}>
				{
					<Circle
						key={marker.key}
						center={marker.position}
						pathOptions={{
							fillColor: '#afd3e2',
							color: '#fff',
							weight: 4,
							opacity: 1,
							fillOpacity: 0.4,
						}}
						radius={600}
					></Circle>
				}
				<Marker position={marker.position} icon={customIconMarker}></Marker>
			</LayerGroup>
		))
	}

	return (
		<div className="content-map relative">
			<MapContainer center={firstPosition} zoom={15} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=240d8d32-bc04-4def-be5a-5a230811e9de"
				/>
				<LocationMarker />
				<LayersControl position="topright">
					<LayersControl.Overlay checked name="Show accuracy radius">
						<LayerGroup>
							<CircleMarkers markers={stationMarkers} />
						</LayerGroup>
					</LayersControl.Overlay>
				</LayersControl>
			</MapContainer>
		</div>
	)
}

export default Map
