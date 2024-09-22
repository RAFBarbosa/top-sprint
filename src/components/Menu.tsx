import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const menuItems = [
	{ id: "/", label: "Inicio" },
	{ id: "/regras", label: "Regras" },
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

export function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<div className="flex items-center md:justify-center h-full gap-x-10">
			<div className="w-[40px] z-50">
				<Link to="/">
					<Logo />
				</Link>
			</div>
			<button
				className="fixed top-2 right-2 z-50 text-3xl focus:outline-none md:hidden px-2"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? "✖" : "☰"}
			</button>

			<div
				className={`fixed top-[52px] right-0 -z-50 bg-f1-red px-2 py-6 transition-transform duration-300 transform ${
					isOpen ? "translate-y-0" : "translate-y-[-320px]"
				} md:hidden w-full -z-50`}
			>
				<div>
					<ul className="space-y-2">
						{menuItems.map((item) => (
							<li
								key={item.id}
								className="border-b-[0.5px] border-r-[0.5px] border-white rounded-br-lg py-2 flex justify-between px-2"
							>
								{item.external ? (
									<a
										href={item.id}
										target="_blank"
										rel="noopener noreferrer"
										className="text-lg"
										onClick={handleLinkClick}
									>
										<span>{item.label}</span>
									</a>
								) : (
									<Link
										to={item.id}
										className="text-lg"
										onClick={handleLinkClick}
									>
										<span>{item.label}</span>
									</Link>
								)}
								<span className="material-symbols-outlined text-sm">
									arrow_forward_ios
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* For larger screens */}
			<div className="hidden md:flex h-full my-2 items-center">
				{menuItems.map((item) => (
					<React.Fragment key={item.id}>
						{item.external ? (
							<a
								href={item.id}
								target="_blank"
								rel="noopener noreferrer"
								className="text-lg h-full items-center flex px-4 hover:bg-f1-carbon transition-colors duration-300"
							>
								<span>{item.label}</span>
							</a>
						) : (
							<Link
								to={item.id}
								className="text-lg h-full items-center flex px-4 hover:bg-f1-carbon transition-colors duration-300"
							>
								<span>{item.label}</span>
							</Link>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
