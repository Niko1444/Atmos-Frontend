import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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

const dummyDataHCM = {
	field1: 28,
	field2: 60,
	field3: 400,
	field4: 5,
	field5: 10,
	field6: 7,
	created_at: Date.now(),
}
const dummyWindHCM = {
	deg: 180,
	speed: 3,
}
const dummyDataThuDuc = {
	field1: 30,
	field2: 55,
	field3: 350,
	field4: 4,
	field5: 8,
	field6: 6,
	created_at: Date.now(),
}
const dummyWindThuDuc = {
	deg: 270,
	speed: 4,
}

function Map() {
	const [dataHCM, setDataHCM] = useState(dummyDataHCM)
	const [dataThuDuc, setDataThuDuc] = useState(dummyDataThuDuc)
	const [windThuDuc, setWindThuDuc] = useState(dummyWindThuDuc)
	const firtsPosition = [10.86748937028891, 106.79438149449618]

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

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp)
		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()
		const hour = date.getHours()
		const minutes = date.getMinutes()
		const seconds = date.getSeconds()

		const formattedDay = day.toString().padStart(2, '0')
		const formattedMonth = month.toString().padStart(2, '0')
		const formattedHour = hour.toString().padStart(2, '0')
		const formattedMinutes = minutes.toString().padStart(2, '0')
		const formattedSeconds = seconds.toString().padStart(2, '0')

		const formattedDate = `${formattedDay}.${formattedMonth}.${year}`
		const formattedTime = `${formattedHour}:${formattedMinutes}:${formattedSeconds}`

		return `${formattedDate} - ${formattedTime}`
	}

	const stationMarkers = [
		{
			key: 'marker1',
			position: [10.86748937028891, 106.79438149449618],
			children: 'Station 1 - Thu Duc City',
			temp: Math.round(dataHCM['field1'] * 1000) / 1000,
			humi: Math.round(dataHCM['field2'] * 1000) / 1000,
			co2: Math.round(dataHCM['field3'] * 1000) / 1000,
			co: Math.round(dataHCM['field4'] * 1000) / 1000,
			dust: Math.round(dataHCM['field5'] * 1000) / 1000,
			uv: Math.round(dataHCM['field6'] * 1000) / 1000,
			windDirection: windThuDuc.deg,
			windSpeed: windThuDuc.speed,
			time: formatTimestamp(dataThuDuc['created_at']),
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

	const MyPopupMarker = ({
		children,
		position,
		temp,
		humi,
		co2,
		co,
		dust,
		uv,
		time,
		windDirection,
		windSpeed,
	}) => (
		<Marker position={position}>
			<Popup>
				<span
					style={{
						fontSize: '1.2rem',
						fontWeight: 'bold',
					}}
				>
					{children}
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					Time: {time}
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					Temperature: {temp} °C
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					Humidity: {humi} %
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					CO2: {co2} PPM
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					CO: {co} PPM
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					Dust: {dust} PPM
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					UV Index: {uv}
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					Wind Direction: {windDirection}
				</span>
				<br />
				<span
					style={{
						fontSize: '1.2rem',
					}}
				>
					Wind Speed: {windSpeed}
				</span>
				<br />
			</Popup>
		</Marker>
	)

	const MyMarkersList = ({ markers }) => {
		const items = markers.map(({ key, ...props }) => (
			<MyPopupMarker key={key} {...props} />
		))
		return <div style={{ display: 'none' }}>{items}</div>
	}
	MyMarkersList.propTypes = {
		markers: PropTypes.array.isRequired,
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

	const TooltipMarker = ({ markers }) => {
		return markers.map((marker) => (
			<Marker
				key={marker.key}
				position={marker.position}
				icon={customIconMarker}
			></Marker>
		))
	}

	return (
		<div className="content-map relative">
			<MapContainer center={firtsPosition} zoom={15} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
				/>

				<LocationMarker />
				<TooltipMarker markers={stationMarkers} />

				<LayersControl position="topright">
					<LayersControl.Overlay checked name="Layer group with circles">
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
