import { useState } from "react";

const menuItems = [
	{ id: "home", label: "Home" },
	{ id: "regras", label: "Regras" },
	{ id: "pontuacao", label: "Pontuação" },
	{ id: "campeoes", label: "Mural dos Campeões" },
	{ id: "calendario", label: "Calendário" },
	{ id: "equipes", label: "Equipes e Pilotos" },
	{ id: "classificacao", label: "Classificação" },
	{ id: "tickets", label: "Tickets" },
];

export function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<button
				className="fixed top-4 right-4 z-50 text-4xl focus:outline-none md:hidden"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? "✖" : "☰"}
			</button>

			<div
				className={`fixed top-0 right-0 h-full bg-gray-700 border-l border-gray-600 p-6 transition-transform duration-300 transform ${
					isOpen ? "translate-x-0" : "translate-x-full"
				} md:hidden w-64 z-40`}
			>
				{/* Menu Items */}
				<div className="mt-12">
					<ul className="space-y-4">
						{menuItems.map((item) => (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									className="text-lg hover:text-gray-300"
									onClick={handleLinkClick}
								>
									<strong>{item.label}</strong>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* For larger screens, the menu is always visible */}
			<div className="hidden md:flex md:justify-end md:items-center md:space-x-6 p-4">
				{menuItems.map((item) => (
					<a
						key={item.id}
						href={`#${item.id}`}
						className="text-lg hover:text-gray-300"
					>
						<strong>{item.label}</strong>
					</a>
				))}
			</div>
		</div>
	);
}
