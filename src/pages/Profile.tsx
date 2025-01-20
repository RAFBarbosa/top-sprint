import { useState, useEffect } from "react";
import PlayerCard from "../components/utils/PlayerCard";
import { useEnhancedCards } from "../components/hooks/useEnhancedCards";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";

export function Profile() {
	const { driverName } = useParams<{ driverName: string }>();
	const enhancedCards = useEnhancedCards();
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);

	useEffect(() => {
		const index = enhancedCards.findIndex(
			(driver) => driver.name.toLowerCase() === driverName?.toLowerCase()
		);
		setCurrentIndex(index);
	}, [driverName, enhancedCards]);

	const handlePrevClick = () => {
		if (currentIndex !== null && currentIndex > 0) {
			const prevDriver = enhancedCards[currentIndex - 1];
			navigate(`/pilotos/${prevDriver.name.toLowerCase()}`);
		}
	};

	const handleNextClick = () => {
		if (currentIndex !== null && currentIndex < enhancedCards.length - 1) {
			const nextDriver = enhancedCards[currentIndex + 1];
			navigate(`/pilotos/${nextDriver.name.toLowerCase()}`);
		}
	};

	const driverData =
		currentIndex !== null ? enhancedCards[currentIndex] : null;

	return (
		<div id="profile" className="bg-f1-lightSilver py-10">
			<div className="bg-white flex flex-col max-w-screen-xl px-3 md:mx-auto py-5 rounded">
				<div className="flex justify-between w-full mb-4">
					<button
						onClick={handlePrevClick}
						disabled={currentIndex === null || currentIndex === 0}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l cursor-pointer"
					>
						<MenuArrow className="rotate-180" />
					</button>
					<button
						onClick={handleNextClick}
						disabled={
							currentIndex === null ||
							currentIndex === enhancedCards.length - 1
						}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r cursor-pointer"
					>
						<MenuArrow />
					</button>
				</div>
				<div className="bg-white md:flex max-w-screen-xl px-3 md:mx-auto py-5 rounded">
					<div className="pr-10">
						{driverData ? (
							<PlayerCard data={driverData} />
						) : (
							<p>Driver not found</p>
						)}
					</div>
					<div className="flex flex-col justify-between w-full">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
							{driverData?.city && (
								<>
									<p className="font-bold">Cidade</p>
									<p>{driverData.city}</p>
								</>
							)}
							{driverData?.stats?.championships && (
								<>
									<p className="font-bold">
										Campeonatos Vencidos
									</p>
									<p>{driverData.stats.championships}</p>
								</>
							)}
							{driverData?.stats?.totalWins && (
								<>
									<p className="font-bold">
										Vitorias em Corridas
									</p>
									<p>{driverData.stats.totalWins}</p>
								</>
							)}
							{driverData?.stats?.totalSprintWins && (
								<>
									<p className="font-bold">
										Vitorias em Sprint
									</p>
									<p>{driverData.stats.totalSprintWins}</p>
								</>
							)}
							{driverData?.stats?.totalPodiums && (
								<>
									<p className="font-bold">Podios</p>
									<p>{driverData.stats.totalPodiums}</p>
								</>
							)}
							{driverData?.stats?.poles && (
								<>
									<p className="font-bold">Poles</p>
									<p>{driverData.stats.poles}</p>
								</>
							)}
							{driverData?.stats?.fastestLaps && (
								<>
									<p className="font-bold">Voltas Rapidas</p>
									<p>{driverData.stats.fastestLaps}</p>
								</>
							)}
							{driverData?.stats?.totalPoints && (
								<>
									<p className="font-bold">Pontos</p>
									<p>{driverData.stats.totalPoints}</p>
								</>
							)}
							{driverData?.stats?.totalPart && (
								<>
									<p className="font-bold">Participacoes</p>
									<p>{driverData.stats.totalPart}</p>
								</>
							)}
							{driverData?.equipment && (
								<>
									<p className="font-bold">Equipamento</p>
									<p>{driverData.equipment}</p>
								</>
							)}
							{driverData?.stream && (
								<>
									<p className="font-bold">Stream</p>
									<p>{driverData.stream}</p>
								</>
							)}
						</div>
						{/* <div>mais stats</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
