import { Logo } from "./Logo";
import { Signature } from "../utils/Signature";
import { Partners } from "./Partners";
import { Link, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { Socials } from "../utils/Socials";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { tenant } from "../../shared/config/tenants";
import PoweredBy from "../utils/PoweredBy";

export function Footer() {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");
	const { name, footerCta } = useTenantConfig();

	return (
		<footer
			style={{ backgroundColor: "var(--color-brand-footer)", color: "var(--color-brand-footer-text)" }}
			className="pb-6 mt-auto"
		>
			{!isAdminPage && <Partners />}
			<div className="flex flex-col-reverse md:flex-row justify-between md:max-w-screen-xl mx-auto px-3 pt-6">
				<div className="flex flex-col items-center md:items-start md:justify-between gap-2 md:gap-1">
					<div className="flex flex-col gap-1 items-center md:items-baseline">
						<div className="flex gap-2 items-center md:items-baseline">
							<div className="h-[45px] w-auto flex items-center">
								<Logo />
							</div>
							{tenant.poweredBy && <PoweredBy />}
						</div>
						<div className="font-light text-sm">
							{name} - Todos os direitos reservados
						</div>
					</div>
					<Link
						to="/admin/painel"
						className="z-50 text-white flex items-center gap-2 bg-f1-silver/80 p-2 rounded cursor-pointer duration-120 footer-admin-btn"
						title="Login Administrador"
					>
						<PersonIcon />
						Login
					</Link>
				</div>
				<div className="md:hidden h-[.5px] w-full bg-white/20 my-6" />
				<div className="flex flex-col justify-between items-center gap-4 md:gap-2">
					<p className="flex justify-center text-center">
						{footerCta}
					</p>
					<Socials />
					<div className="h-[.5px] w-[45px] bg-f1-silver my-2 self-end hidden md:block" />

					<div className="self-end hidden md:block">
						<Signature />
					</div>
				</div>
				<div className="order-first w-full md:hidden">
					<div className="md:hidden h-[.5px] bg-f1-silver my-6" />
					<div className="self-end">
						<Signature side="left" />
					</div>
				</div>
			</div>
		</footer>
	);
}

