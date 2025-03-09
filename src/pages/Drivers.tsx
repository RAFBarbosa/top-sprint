import { useEnhancedCards } from "../components/hooks/useEnhancedCards";
import DriverList from "../components/drivers/DriverList";

const Drivers: React.FC = () => {
	const enhancedCards = useEnhancedCards();

	const gridA = enhancedCards.filter((driver) => driver.grid === "gridA");
	const gridB = enhancedCards.filter((driver) => driver.grid === "gridB");
	const reserves = enhancedCards.filter(
		(driver) => driver.grid === "reserva"
	);

	return (
		<div id="pilotos" className="bg-f1-lightSilver w-full pt-4 pb-8">
			<div className="max-w-screen-xl mx-auto bg-white rounded p-6 space-y-6">
				<DriverList gridName="Grid A" drivers={gridA} />
				<DriverList gridName="Grid B" drivers={gridB} />
				<DriverList
					gridName="Reservas e Ex-Pilotos"
					drivers={reserves}
				/>
			</div>
		</div>
	);
};

export default Drivers;
