import React, { useState } from 'react'

function SelectAlgorithmBtn({ onSelectAlgorithm }) {
	const [isOpen, setIsOpen] = useState(false) // State to manage dropdown visibility
	const [selectedAlgorithm, setSelectedAlgorithm] = useState('') // State to store selected algorithm

	const handleSelectAlgorithm = (algorithm) => {
		setSelectedAlgorithm(algorithm)
		setIsOpen(false) // Close the dropdown after selecting an algorithm
		onSelectAlgorithm(algorithm) // Notify the parent component about the selected algorithm
	}

	const handleUnselectAlgorithm = () => {
		setSelectedAlgorithm('')
		onSelectAlgorithm('') // Notify the parent component about the unselected algorithm
	}

	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn-now ml-2 w-52 bg-black text-center"
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedAlgorithm || 'Predict Algorithm'}
			</div>
			{isOpen && (
				<ul
					tabIndex={0}
					className="menu dropdown-content z-[1] w-52 rounded-box bg-white p-2 text-black shadow"
				>
					<li>
						<button onClick={() => handleSelectAlgorithm('Prophet')}>
							Prophet
						</button>
					</li>
					<li>
						<button onClick={() => handleSelectAlgorithm('LSTM')}>LSTM</button>
					</li>
					<li>
						<button onClick={() => handleSelectAlgorithm('Prophet + LSTM')}>
							Prophet + LSTM
						</button>
					</li>
					{selectedAlgorithm && ( // Show the "Unselect" option only if an algorithm is selected
						<li>
							<button onClick={handleUnselectAlgorithm} className=" font-thin">
								Unselect
							</button>
						</li>
					)}
				</ul>
			)}
		</div>
	)
}

export default SelectAlgorithmBtn
