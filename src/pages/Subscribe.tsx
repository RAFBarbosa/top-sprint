import { Teams } from "../components/Teams";
import { Header } from "../components/Header";
import { HallsOfFame } from "../components/HallsOfFame";
import { Footer } from "../components/Footer";
import { Standings } from "../components/Standings";
import { Rules } from "../components/Rules";

export function Subscribe() {
	return (
		<div
			id="home"
			className="min-h-screen bg-blur bg-no-repeat bg-cover flex flex-col items-center"
		>
			<Header />
			<div
				id="regras"
				className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between mt-[64px] md:mt-[73px] mx-auto"
			>
				<Rules />
			</div>
			<div
				id="campeoes"
				className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between mt-10 md:mt-20 mx-auto"
			>
				<HallsOfFame />
			</div>
			<div
				id="equipes"
				className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between my-10 md:mt-20 mx-auto"
			>
				<Teams />
			</div>
			<div
				id="classificacao"
				className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between my-10 md:mt-20 mx-auto"
			>
				<Standings />
			</div>
			<div className="w-full bg-gray-900">
				<Footer />
			</div>
		</div>
	);
}
