import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const menuItems = [
	{ id: "/", label: "Inicio" },
	{ id: "/regras", label: "Regras e Formato" },
	// { id: "/pontuacao", label: "Pontuação" },
	{ id: "/campeoes", label: "Mural dos Campeões" },
	// { id: "/calendario", label: "Calendário" },
	// { id: "/equipes", label: "Equipes e Pilotos" },
	// { id: "/classificacao", label: "Classificação" },
	{
		id: "https://docs.google.com/forms/d/e/1FAIpQLSfHN50Fhz16wKABFaKlBa-iLFSeDVENnuZyZ7pK40qXJkL5Nw/viewform",
		label: "Tickets",
		external: true,
	},
	// { id: "/arquivo", label: "Arquivo" },
];

const smoothScrolling = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

export function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	const handleLinkClick = () => {
		setIsOpen(false);
		smoothScrolling();
	};

	return (
		<div className="flex items-center justify-between md:justify-center h-full md:gap-x-10 text-white">
			<button className="w-[40px] z-50 ml-3 md:ml-0">
				<Link to="/" onClick={handleLinkClick}>
					<Logo />
				</Link>
			</button>
			<button className="text-xl font-semibold md:hidden z-50">
				<Link to="/" onClick={handleLinkClick}>
					Liga Top Sprint
				</Link>
			</button>
			<button
				className="text-3xl md:hidden z-50 w-[25px] h-[50px] mr-3 md:mr-0"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? "✖" : "☰"}
			</button>
			<div className="md:hidden absolute bg-f1-red w-full h-full z-40"></div>

			<div
				className={`fixed top-0 right-0 bg-f1-red px-2 py-6 transition-transform duration-300 transform ${
					isOpen ? "translate-y-[56px]" : "translate-y-[-320px]"
				} md:hidden w-full z-30`}
			>
				<ul className="space-y-2">
					{menuItems.map((data) => (
						<li
							key={data.id}
							className="border-b-[0.5px] border-r-[0.5px] border-white rounded-br-lg py-2 flex justify-between px-2"
						>
							{data.external ? (
								<a
									href={data.id}
									target="_blank"
									rel="noopener noreferrer"
									className="text-lg w-full flex justify-between items-center py-2 px-2"
									onClick={handleLinkClick}
								>
									<span>{data.label}</span>
									<span className="material-symbols-outlined text-sm">
										arrow_forward_ios
									</span>
								</a>
							) : (
								<Link
									to={data.id}
									className="text-lg w-full flex justify-between items-center py-2 px-2"
									onClick={handleLinkClick}
								>
									<span>{data.label}</span>
									<span className="material-symbols-outlined text-sm">
										arrow_forward_ios
									</span>
								</Link>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* For larger screens */}
			<div className="hidden md:flex h-full my-2 items-center">
				{menuItems.map((data) => (
					<React.Fragment key={data.id}>
						{data.external ? (
							<a
								href={data.id}
								target="_blank"
								rel="noopener noreferrer"
								className="text-lg h-full items-center flex px-4 hover:bg-f1-carbon transition-colors duration-300"
							>
								<span>{data.label}</span>
							</a>
						) : (
							<Link
								to={data.id}
								onClick={handleLinkClick}
								className="text-lg h-full items-center flex px-4 hover:bg-f1-carbon transition-colors duration-300"
							>
								<span>{data.label}</span>
							</Link>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
