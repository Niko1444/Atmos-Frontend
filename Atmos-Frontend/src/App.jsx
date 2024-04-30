import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Import Pages
import Home from './routes/Home/Home'
import Setting from './routes/Setting/Setting'
import Dashboard from './routes/Dashboard/Dashboard'
import Layout from './components/Layout'
import About from './routes/About/About'

// Import Not Found Page
import NotFound from './routes/NotFound'

function App() {
	return (
		<Layout>
			<Routes>
				{/* All main pages */}
				<Route path="/" element={<Home />} />

				{/* Dashboard */}
				<Route path="/dashboard" element={<Dashboard />} />

				{/* Setting */}
				{/* <Route path="/setting" element={<Setting />} /> */}

				{/* About */}
				<Route path="/about" element={<About />} />

				{/* Error pages */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	)
}

export default App
