import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import { Link } from "react-router-dom";
import { useGetTeamsQuery } from "../../graphql/generated";

const DriverMenu: React.FC = () => {
	const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

	const { data, error, loading } = useGetTeamsQuery();

	const handleDriverClick = (driverName: string) => {
		setSelectedDriver(driverName);
	};

	const drivers = [
		"Aldo Ribeiro",
		"Fidelix",
		"Hernan Muniz",
		// Add more driver names as needed
	];

	return (
		<div>
			<ul>
				{drivers.map((driver) => (
					<li key={driver} onClick={() => handleDriverClick(driver)}>
						<Link to={`/pilotos/${encodeURIComponent(driver)}`}>
							{driver}
						</Link>
					</li>
				))}
			</ul>
			{/* {selectedDriver && <PlayerCard driverName={selectedDriver} />} */}
		</div>
	);
};

export default DriverMenu;
