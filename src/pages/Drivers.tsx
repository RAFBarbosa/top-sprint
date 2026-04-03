import { useEnhancedCards } from "../shared/hooks/useEnhancedCards";
import DriverList from "../components/drivers/DriverList";
import { Divider } from "../components/layout/Divider";
import { useTab } from "../contexts/TabContext";
import { tenant } from "../shared/config/tenants";
import { useDriverProfiles } from "../contexts/DriverProfilesContext";

const Drivers: React.FC = () => {
	const { activeTab } = useTab();
	const { enhancedCards, loading, error } = useEnhancedCards(activeTab.id);
	const { isInGrid, applyProfile, profiles } = useDriverProfiles();

	const activeDrivers = enhancedCards
		.filter((driver) => {
			if (!driver.id) return true;
			return isInGrid(driver.id, activeTab.id) || !profiles[driver.id];
		})
		.map((driver) => applyProfile(driver, activeTab.id))
		.filter((driver) => !driver.reserve && !driver.exDriver);

	return (
		<div id="pilotos" className="bg-f1-lightSilver w-full pb-8">
			<Divider className="max-w-screen-xl mx-auto" />
			<div className="max-w-screen-xl mx-auto bg-white rounded-t p-6 pb-0 px-3">
				<div className="border-t-8 border-r-8 rounded-tr-3xl pt-3 relative mb-8 border-f1-text">
					<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide">
						Pilotos
					</h1>
				</div>
				<div className="p-3 w-full h-auto bg-f1-bg-silver bg-cover bg-opacity-5 rounded-xl tracking-normal">
					Confira o line-up oficial da temporada. Cards e detalhes
					completos de todos os pilotos {tenant.name}, com pontuação e
					resultados atualizados.
				</div>
			</div>
			<div className="max-w-screen-xl mx-auto bg-white rounded-b p-6 space-y-6">
				<DriverList
					gridName={activeTab.label}
					drivers={activeDrivers}
				/>
			</div>
		</div>
	);
};

export default Drivers;
