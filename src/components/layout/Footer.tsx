import { Logo } from "./Logo";
import { Signature } from "../utils/Signature";
import { Partners } from "./Partners";
import { Link, useLocation } from "react-router-dom";
import { Socials } from "../utils/Socials";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { tenant } from "../../shared/config/tenants";
import PoweredBy from "../utils/PoweredBy";

export function Footer() {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");
	const { name, footerCta, features, nav } = useTenantConfig();
	const year = new Date().getFullYear();

	const navLinks: { label: string; to: string; external?: boolean }[] = [
		{ label: "Início", to: "/" },
		{ label: "Resultados", to: "/resultados" },
		{ label: "Pilotos", to: "/pilotos" },
		...(features.hallOfFame
			? [{ label: "Mural dos Campeões", to: "/campeoes" }]
			: []),
		...(features.archive ? [{ label: "Histórico", to: "/historico" }] : []),
		...(nav.ticketUrl
			? [{ label: "Abrir Ticket", to: nav.ticketUrl, external: true }]
			: []),
		...(nav.registrationUrl
			? [{ label: "Inscrições", to: nav.registrationUrl, external: true }]
			: []),
	];

	return (
		<footer
			style={{
				backgroundColor: "var(--color-brand-footer)",
				color: "var(--color-brand-footer-text)",
			}}
			className="pb-6 mt-auto"
		>
			{!isAdminPage && <Partners />}

			<div className="md:max-w-screen-xl mx-auto px-3 pt-10 pb-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
					{/* Brand */}
					<div className="flex flex-col gap-4">
						<div className="flex gap-2 items-center">
							<div className="h-[45px] w-auto flex items-center">
								<Logo />
							</div>
							{tenant.poweredBy && <PoweredBy />}
						</div>
						{footerCta && (
							<p className="text-sm opacity-60 leading-relaxed">
								{footerCta}
							</p>
						)}
					</div>

					{/* Pages */}
					<div>
						<div
							className="border-t-2 pt-1.5 mb-5 inline-block"
							style={{
								borderColor: "var(--color-brand-primary)",
							}}
						>
							<span className="font-futosans uppercase tracking-widest text-xs font-normal opacity-60">
								Páginas
							</span>
						</div>
						<ul className="space-y-1.5 ml-2">
							{navLinks.map((link) =>
								link.external ? (
									<li key={link.to}>
										<a
											href={link.to}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs font-normal opacity-50 hover:opacity-100 transition-opacity"
										>
											{link.label}
										</a>
									</li>
								) : (
									<li key={link.to}>
										<Link
											to={link.to}
											className="text-xs font-normal opacity-50 hover:opacity-100 transition-opacity"
										>
											{link.label}
										</Link>
									</li>
								),
							)}
						</ul>
					</div>

					{/* Socials */}
					<div>
						<div
							className="border-t-2 pt-1.5 mb-5 inline-block"
							style={{
								borderColor: "var(--color-brand-primary)",
							}}
						>
							<span className="font-futosans uppercase tracking-widest text-xs font-normal opacity-60">
								Redes Sociais
							</span>
						</div>
						<Socials />
					</div>
				</div>

				{/* Bottom bar */}
				<div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
					<p className="text-xs opacity-40 tracking-wide font-light">
						© {year} {name} — Todos os direitos reservados
					</p>
					<Signature />
				</div>
			</div>
		</footer>
	);
}
