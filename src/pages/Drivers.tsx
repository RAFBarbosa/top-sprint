import React from "react";
import { Link } from "react-router-dom";
import { useEnhancedCards } from "../components/hooks/useEnhancedCards";
import useNormalizeString from "../components/hooks/useNormalizeString";

const Drivers: React.FC = () => {
	const enhancedCards = useEnhancedCards();

	return (
		<div className="bg-f1-lightSilver py-10 w-full">
			<div className="max-w-screen-xl mx-auto bg-white rounded p-6">
				<h1 className="text-2xl font-bold mb-6">Pilotos</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{enhancedCards.map((driver) => (
						<Link
							key={driver.name}
							to={`/pilotos/${useNormalizeString(
								driver.name.toLowerCase()
							)}`}
							className="block p-4 border rounded hover:bg-gray-100"
						>
							<div className="flex items-center">
								<img
									src={driver.photo}
									alt={driver.name}
									className="w-16 h-16 rounded-full mr-4"
								/>
								<div>
									<p className="text-lg font-semibold">
										{driver.name}
									</p>
									<p className="text-sm text-gray-600">
										{driver.teamName}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Drivers;
