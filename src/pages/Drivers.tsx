import { useEnhancedCards } from "../components/hooks/useEnhancedCards";
import DriverList from "../components/drivers/DriverList";
import { Divider } from "../components/layout/Divider";
import { useTab } from "../contexts/TabContext";

const Drivers: React.FC = () => {
	const { activeTab } = useTab();

	const { enhancedCards, loading, error } = useEnhancedCards(activeTab.id);

	const gridA = enhancedCards.filter((driver) => driver.grid === "gridA");
	const gridB = enhancedCards.filter((driver) => driver.grid === "gridB");
	const gridC = enhancedCards.filter((driver) => driver.grid === "gridC");
	const reserves = enhancedCards.filter(
		(driver) => driver.grid === "reserva" || driver.grid === "inativo"
	);

	const gridDriversMap = {
		gridA: gridA,
		gridB: gridB,
		gridC: gridC,
	};

	return (
		<div id="pilotos" className="bg-f1-lightSilver w-full pb-8">
			<Divider className="max-w-screen-xl mx-auto" />
			<div className="max-w-screen-xl mx-auto bg-white rounded-t p-6 pb-0 px-3">
				<div className="border-t-8 border-r-8 border-f1-carbon rounded-tr-3xl pt-3 relative mb-8">
					<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide">
						Pilotos
					</h1>
				</div>
				<div className="p-3 w-full h-auto bg-f1-bg-silver bg-cover bg-opacity-5 rounded-xl tracking-normal">
					Confira o line-up oficial da temporada. Cards e detalhes
					completos de todos os pilotos Top Sprint, com pontuação e
					resultados atualizados.
				</div>
			</div>
			<div className="max-w-screen-xl mx-auto bg-white rounded-b p-6 space-y-6">
				<DriverList
					// gridName={activeTab.label}
					drivers={gridDriversMap[activeTab.id]}
				/>
				{/* Uncomment if you want to show reserves
				<DriverList
					gridName="Reservas e Ex-Pilotos"
					drivers={reserves}
				/> */}
			</div>
		</div>
	);
};

export default Drivers;