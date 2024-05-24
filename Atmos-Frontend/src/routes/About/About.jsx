import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faGithub,
	faFacebook,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

const AboutPage = () => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		setIsOpen(true) // Trigger the opening animation when the component mounts
	}, [])

	return (
		<div className=" flex h-[100vh] flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
			<h1 className="mb-8 text-center text-3xl font-bold text-accent">
				About ATMOS
			</h1>
			<Transition
				show={isOpen}
				enter="transition-opacity duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				{(ref) => (
					<div>
						<p className="mb-4 text-center text-lg text-gray-800" ref={ref}>
							ATMOS is a real-time air quality monitoring and forecasting system
							designed for smart cities, utilizing fog computing technology. It
							is developed by:
						</p>
						<p className="mb-4 text-center text-lg text-accent">
							Duong Trong Nghia, Le Tien Phat, Tran Vu Khanh Hung, Vo Hoai Bao,
							Nguyen Huynh Thao My, Dr. Le Duy Tan, and Dr. Huynh Kha Tu.
						</p>
					</div>
				)}
			</Transition>
			<Transition
				show={isOpen}
				enter="transition-opacity duration-300 delay-150"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				{(ref) => (
					<p className="mb-4 text-center text-lg text-gray-800" ref={ref}>
						The system aims to provide accurate and up-to-date information about
						air quality to residents of smart cities, enabling them to make
						informed decisions about their activities and health. By leveraging
						fog computing, ATMOS ensures efficient data processing and analysis,
						even in resource-constrained environments.
					</p>
				)}
			</Transition>
			<Transition
				show={isOpen}
				enter="transition-opacity duration-300 delay-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				{(ref) => (
					<p className="mb-4 text-center text-lg text-gray-800" ref={ref}>
						For inquiries or further information, please contact Dr. Le Duy Tan
						at{' '}
						<a
							href="mailto:ldtan@hcmiu.edu.vn"
							className="text-blue-500 hover:underline"
						>
							ldtan@hcmiu.edu.vn
						</a>
						.
					</p>
				)}
			</Transition>
			<Transition
				show={isOpen}
				enter="transition-opacity duration-300 delay-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="mt-8 flex gap-4">
					{' '}
					{/* Container for Social Icons */}
					<a
						href="https://github.com/dtnghia2010/-Atmos-AIAir-Quality-project"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faGithub} size="2x" />
					</a>
					<a
						href="https://www.facebook.com/aiotlab.vn"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faFacebook} size="2x" />
					</a>
					<a
						href="https://www.linkedin.com/company/aiot-lab-vn/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faLinkedin} size="2x" />
					</a>
				</div>
			</Transition>
		</div>
	)
}

export default AboutPage
